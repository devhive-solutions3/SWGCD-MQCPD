"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box, Button, Heading, Spinner, VStack, Text, Tabs, TabList, TabPanels, Tab, TabPanel,
  Table, Thead, Tbody, Tr, Th, Td, Select, Flex, Input, Textarea, useToast, IconButton, HStack,
  FormControl, FormLabel
} from "@chakra-ui/react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { collection, getDocs, updateDoc, doc, addDoc, query, orderBy, serverTimestamp, setDoc, getDoc, deleteDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth } from "@/lib/firebaseconfig"
import { db } from "@/lib/firebaseconfig"
import { FiLogOut, FiTrash2 } from "react-icons/fi"

const REMINDER_TYPES = ["Reminder", "Announcement", "Tip", "Wellness"];

export default function CounselorDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [reminderType, setReminderType] = useState(REMINDER_TYPES[0])
  const [reminder, setReminder] = useState("")
  const [reminderInput, setReminderInput] = useState("")
  const [eventForm, setEventForm] = useState({ title: "", date: "", time: "", location: "", description: "" })
  const [eventEditId, setEventEditId] = useState<string | null>(null)
  const [eventEdit, setEventEdit] = useState({ title: "", date: "", time: "", location: "", description: "" })
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const toast = useToast()
  const [tabIndex, setTabIndex] = useState(0)

  // Date filter state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Add type filter state
  const [typeFilter, setTypeFilter] = useState("");

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("👤 Firebase Auth User:", user)
  
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
        router.replace("/admin/login")
      }
    })
    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    const fetchBookings = async () => {
      const snap = await getDocs(query(collection(db, "bookings"), orderBy("createdAt", "desc")))
      setBookings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }
    fetchBookings()
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      const snap = await getDocs(query(collection(db, "events"), orderBy("date", "desc")))
      setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    const fetchReminder = async () => {
      const docRef = doc(db, "reminders", reminderType)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setReminder(docSnap.data().text || "")
        setReminderInput(docSnap.data().text || "")
      } else {
        setReminder("")
        setReminderInput("")
      }
    }
    fetchReminder()
  }, [reminderType])

  const handleStatusChange = async (id: string, status: string) => {
    await updateDoc(doc(db, "bookings", id), { status })
    setBookings(bookings => bookings.map(b => b.id === id ? { ...b, status } : b))
    toast({ title: "Status updated", status: "success", duration: 2000 })
  }

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventForm.title || !eventForm.date) return toast({ title: "Title and date required", status: "error" })
    
    let thumbnailURL = ""
    if (thumbnail) {
      const storage = getStorage()
      const storageRef = ref(storage, `event-thumbnails/${thumbnail.name}`)
      await uploadBytes(storageRef, thumbnail)
      thumbnailURL = await getDownloadURL(storageRef)
    }

    await addDoc(collection(db, "events"), { 
      ...eventForm, 
      thumbnailURL,
      createdAt: serverTimestamp() 
    })
    
    setEventForm({ title: "", date: "", time: "", location: "", description: "" })
    setThumbnail(null)
    toast({ title: "Event added", status: "success" })
    const snap = await getDocs(query(collection(db, "events"), orderBy("date", "desc")))
    setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  }

  const handleEditEvent = (event: any) => {
    setEventEditId(event.id)
    setEventEdit({ title: event.title, date: event.date, time: event.time || "", location: event.location || "", description: event.description })
  }

  const handleUpdateEvent = async (id: string) => {
    await updateDoc(doc(db, "events", id), { ...eventEdit })
    setEventEditId(null)
    toast({ title: "Event updated", status: "success" })
    const snap = await getDocs(query(collection(db, "events"), orderBy("date", "desc")))
    setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  }

  const handleUpdateReminder = async () => {
    await setDoc(doc(db, "reminders", reminderType), { text: reminderInput })
    setReminder(reminderInput)
    toast({ title: `${reminderType} updated`, status: "success" })
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.replace("/admin/login")
  }

  const handleDeleteEvent = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
    toast({ title: "Event deleted", status: "success" });
    setEvents(events => events.filter(ev => ev.id !== id));
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="green.500" />
      </Box>
    )
  }

  if (!user) return null

  return (
    <Box minH="100vh" bg="gray.50" p={{ base: 2, md: 8 }} pt="160px">
      <Box bg="white" borderRadius="xl" boxShadow="lg" p={{ base: 2, md: 8 }}>
        <Tabs index={tabIndex} onChange={setTabIndex} isFitted variant="enclosed">
          <TabList mb={4}>
            <Tab>Manage Bookings</Tab>
            <Tab>Manage Events</Tab>
            <Tab>Homepage Reminders</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Heading size="md" mb={4}>All Bookings</Heading>
              {/* Date Filter Controls */}
              <Flex mb={4} gap={4} align="center" wrap="wrap">
                <Box>
                  <Text fontWeight="medium" mb={1}>Date</Text>
                  <Input
                    type="date"
                    size="sm"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    maxW="180px"
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Type of Service</Text>
                  <Select
                    size="sm"
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                    maxW="200px"
                  >
                    <option value="">All</option>
                    <option value="Guidance">Guidance</option>
                    <option value="Counseling">Counseling</option>
                  </Select>
                </Box>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setStartDate(""); setTypeFilter(""); }}
                  ml={2}
                  mt={6}
                >
                  Clear Filters
                </Button>
              </Flex>
              {/* Filter bookings by date and type */}
              {(() => {
                const selectedType = typeFilter.toLowerCase();
                const filteredBookings = bookings.filter((booking) => {
                  const dateMatch = !startDate || booking.date === startDate;
                  const service = (booking.serviceType || '').toLowerCase();
                  let typeMatch = true;
                  if (selectedType === 'guidance') {
                    typeMatch = service.includes('interview');
                  } else if (selectedType === 'counseling') {
                    typeMatch = service === 'counseling';
                  }
                  return dateMatch && typeMatch;
                });
                return (
                  <Box overflowX="auto">
                    <Table size="sm" variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Full Name</Th>
                          <Th>Email</Th>
                          <Th>Program</Th>
                          <Th>Type</Th>
                          <Th>Date</Th>
                          <Th>Time</Th>
                          <Th>Status</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {filteredBookings.map(b => (
                          <Tr key={b.id}>
                            <Td>{b.fullname}</Td>
                            <Td>{b.email}</Td>
                            <Td>{b.program}</Td>
                            <Td>{b.type || 'Guidance'}</Td>
                            <Td>{b.date}</Td>
                            <Td>{b.time}</Td>
                            <Td>{b.status}</Td>
                            <Td>
                              <Select size="sm" value={b.status} onChange={e => handleStatusChange(b.id, e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="completed">Completed</option>
                              </Select>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                );
              })()}
            </TabPanel>
            <TabPanel px={0}>
              <Heading size="md" mb={4}>Manage Events</Heading>
              <Box mb={6}>
                <form onSubmit={handleAddEvent}>
                  <Flex gap={2} flexWrap="wrap" align="center">
                    <Input
                      placeholder="Title"
                      value={eventForm.title}
                      onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))}
                      maxW="160px"
                      required
                    />
                    <Input
                      type="date"
                      value={eventForm.date}
                      onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))}
                      maxW="120px"
                      required
                    />
                    <Input
                      placeholder="Time"
                      value={eventForm.time}
                      onChange={e => setEventForm(f => ({ ...f, time: e.target.value }))}
                      maxW="100px"
                    />
                    <Input
                      placeholder="Location"
                      value={eventForm.location}
                      onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))}
                      maxW="140px"
                    />
                    <Input
                      placeholder="Description"
                      value={eventForm.description}
                      onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))}
                      maxW="200px"
                    />
                    <Box maxW="200px" w="100%">                      
                      <Box
                        as="label"
                        htmlFor="thumbnail-upload"
                        border="1px dashed"
                        borderColor="gray.300"
                        px={4}
                        py={2}
                        borderRadius="md"
                        cursor="pointer"
                        display="flex"
                        alignItems="center"
                        height="40px"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        _hover={{ bg: "gray.50" }}
                      >
                        {thumbnail?.name ? `📁 ${thumbnail.name}` : "Upload Thumbnail"}
                        <Input
                          id="thumbnail-upload"
                          type="file"
                          accept="image/*"
                          display="none"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setThumbnail(e.target.files[0]);
                            }
                          }}
                        />
                      </Box>
                    </Box>
                    <Button type="submit" colorScheme="green" height="40px" px={6}>Add Event</Button>
                  </Flex>
                </form>
              </Box>
              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Date</Th>
                    <Th>Time</Th>
                    <Th>Location</Th>
                    <Th>Description</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {events.map(ev => (
                    <Tr key={ev.id}>
                      <Td>
                        {eventEditId === ev.id ? (
                          <Input value={eventEdit.title} onChange={e => setEventEdit(f => ({ ...f, title: e.target.value }))} size="sm" />
                        ) : ev.title}
                      </Td>
                      <Td>
                        {eventEditId === ev.id ? (
                          <Input type="date" value={eventEdit.date} onChange={e => setEventEdit(f => ({ ...f, date: e.target.value }))} size="sm" />
                        ) : ev.date}
                      </Td>
                      <Td>
                        {eventEditId === ev.id ? (
                          <Input value={eventEdit.time} onChange={e => setEventEdit(f => ({ ...f, time: e.target.value }))} size="sm" />
                        ) : ev.time}
                      </Td>
                      <Td>
                        {eventEditId === ev.id ? (
                          <Input value={eventEdit.location} onChange={e => setEventEdit(f => ({ ...f, location: e.target.value }))} size="sm" />
                        ) : ev.location}
                      </Td>
                      <Td>
                        {eventEditId === ev.id ? (
                          <Input value={eventEdit.description} onChange={e => setEventEdit(f => ({ ...f, description: e.target.value }))} size="sm" />
                        ) : ev.description}
                      </Td>
                      <Td>
                        {eventEditId === ev.id ? (
                          <HStack>
                            <Button size="sm" colorScheme="green" onClick={() => handleUpdateEvent(ev.id)}>Save</Button>
                            <Button size="sm" variant="ghost" onClick={() => setEventEditId(null)}>Cancel</Button>
                          </HStack>
                        ) : (
                          <HStack>
                            <Button size="sm" variant="outline" onClick={() => handleEditEvent(ev)}>Edit</Button>
                            <IconButton
                              size="sm"
                              colorScheme="red"
                              aria-label="Delete"
                              icon={<FiTrash2 />}
                              onClick={() => handleDeleteEvent(ev.id)}
                            />
                          </HStack>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel px={0}>
              <Heading size="md" mb={4}>Homepage Reminder</Heading>
              <Box mb={4}>
                <Text mb={2} color="gray.600">Reminder Type:</Text>
                <Select value={reminderType} onChange={e => setReminderType(e.target.value)} maxW="240px" mb={4}>
                  {REMINDER_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
                <Text mb={2} color="gray.600">Current {reminderType}:</Text>
                <Box p={3} bg="gray.100" borderRadius="md" mb={2}>{reminder || <em>No {reminderType.toLowerCase()} set.</em>}</Box>
              </Box>
              <Textarea
                value={reminderInput}
                onChange={e => setReminderInput(e.target.value)}
                placeholder={`Enter homepage ${reminderType.toLowerCase()} text...`}
                rows={4}
                mb={4}
              />
              <Button colorScheme="green" onClick={handleUpdateReminder}>Update {reminderType}</Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
} 