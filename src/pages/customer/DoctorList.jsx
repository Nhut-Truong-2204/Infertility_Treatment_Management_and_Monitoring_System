// import React, { useEffect, useState } from 'react';
// import axios from '../../config/axios';
// import {
//   Box,
//   Button,
//   Input,
//   Select,
//   Spinner,
//   Text,
//   Heading,
//   Image,
//   SimpleGrid,
//   Flex,
//   Stack,
// } from "@chakra-ui/react";

// const DoctorListPage = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [search, setSearch] = useState('');
//   const [specializationId, setSpecializationId] = useState('');
//   const [pagination, setPagination] = useState({});

//   const fetchDoctors = async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page,
//         limit,
//         ...(search && { search }),
//         ...(specializationId && { specializationId }),
//       };
//       const res = await axios.get('/api/v1/doctors', { params });
//       if (res.data.success) {
//         setDoctors(res.data.data);
//         setPagination(res.data.pagination);
//       }
//     } catch (err) {
//       console.error('Lỗi khi lấy danh sách bác sĩ:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, [page, search, specializationId]);

//   return (
//     <Box p={6} maxW="1200px" mx="auto">
//       <Heading mb={6} fontSize="3xl">Danh sách bác sĩ</Heading>

//       <Flex
//         direction={{ base: "column", md: "row" }}
//         gap={4}
//         mb={6}
//         align="center"
//       >
//         <Input
//           placeholder="Tìm kiếm bác sĩ..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           flex={{ base: '1', md: '0.5' }}
//         />
//         <Select
//           placeholder="Chọn chuyên khoa"
//           onChange={(e) => setSpecializationId(e.target.value)}
//           flex={{ base: '1', md: '0.3' }}
//           value={specializationId}
//         >
//           <option value="">Tất cả</option>
//           <option value="1">Nội khoa</option>
//           <option value="2">Ngoại khoa</option>
//           {/* TODO: Replace with dynamic list from API */}
//         </Select>
//       </Flex>

//       {loading ? (
//         <Flex justify="center" py={10}>
//           <Spinner size="xl" color="gray.500" />
//         </Flex>
//       ) : (
//         <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
//           {doctors.map((doctor) => (
//             <Box
//               key={doctor.userId}
//               borderWidth="1px"
//               borderRadius="xl"
//               overflow="hidden"
//               boxShadow="md"
//               _hover={{ boxShadow: "xl", transition: "0.3s" }}
//             >
//               <Image
//                 src={doctor.profilePictureUrl || '/default-avatar.png'}
//                 alt={doctor.fullName}
//                 objectFit="cover"
//                 w="100%"
//                 h="192px"
//                 borderTopRadius="xl"
//               />
//               <Box p={4}>
//                 <Text fontWeight="semibold" fontSize="xl" mb={1}>
//                   {doctor.fullName}
//                 </Text>
//                 <Text fontSize="sm" fontStyle="italic" color="gray.600" mb={2}>
//                   {doctor.specializationName}
//                 </Text>
//                 <Text fontSize="sm" noOfLines={3}>
//                   {doctor.shortBio}
//                 </Text>
//               </Box>
//             </Box>
//           ))}
//         </SimpleGrid>
//       )}

//       {/* Pagination */}
//       <Flex justify="space-between" align="center" mt={8}>
//         <Button
//           isDisabled={page <= 1 || loading}
//           onClick={() => setPage((prev) => prev - 1)}
//         >
//           Trang trước
//         </Button>
//         <Text fontSize="sm" color="gray.600">
//           Trang {pagination.currentPage || page} / {pagination.totalPages || '?'}
//         </Text>
//         <Button
//           isDisabled={page >= pagination.totalPages || loading}
//           onClick={() => setPage((prev) => prev + 1)}
//         >
//           Trang sau
//         </Button>
//       </Flex>
//     </Box>
//   );
// };

// export default DoctorListPage;
