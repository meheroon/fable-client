// "use client";

// import { useEffect, useState } from "react";
// import useAuth from "@/hooks/useAuth";
// import axiosSecure from "@/lib/axiosSecure";

// export default function ManageEbooksPage() {
//   const { user } = useAuth();
//   const [ebooks, setEbooks] = useState([]);

//   useEffect(() => {
//     if (!user?.email) return;

//     axiosSecure
//       .get(`/writer/ebooks/${user.email}`)
//       .then((res) => setEbooks(res.data || []));
//   }, [user?.email]);

//   return (
//     <section>
//       <h1 className="text-3xl font-bold">Manage My Ebooks</h1>

//       {ebooks.length === 0 ? (
//         <p className="mt-6">No ebooks found.</p>
//       ) : (
//         <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
//           <table className="w-full">
//             <thead className="bg-slate-900 text-white">
//               <tr>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Genre</th>
//                 <th className="p-3 text-left">Price</th>
//                 <th className="p-3 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ebooks.map((ebook) => (
//                 <tr key={ebook._id} className="border-b">
//                   <td className="p-3">{ebook.title}</td>
//                   <td className="p-3">{ebook.genre}</td>
//                   <td className="p-3">${ebook.price}</td>
//                   <td className="p-3">{ebook.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </section>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import useAxiosSecure from "@/hooks/useAxiosSecure";

// export default function AdminManageEbooksPage() {
//   const axiosSecure = useAxiosSecure();
//   const [ebooks, setEbooks] = useState([]);

//   useEffect(() => {
//     axiosSecure.get("/ebooks").then((res) => {
//       setEbooks(res.data?.ebooks || []);
//     });
//   }, [axiosSecure]);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Manage Ebooks</h1>

//       <div className="overflow-x-auto rounded-xl shadow">
//         <table className="w-full bg-white">
//           <thead className="bg-slate-950 text-white">
//             <tr>
//               <th className="p-4 text-left">Title</th>
//               <th className="p-4 text-left">Writer</th>
//               <th className="p-4 text-left">Genre</th>
//               <th className="p-4 text-left">Price</th>
//               <th className="p-4 text-left">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {ebooks.map((ebook) => (
//               <tr key={ebook._id} className="border-b">
//                 <td className="p-4">{ebook.title}</td>
//                 <td className="p-4">{ebook.writerEmail}</td>
//                 <td className="p-4">{ebook.genre}</td>
//                 <td className="p-4">${ebook.price}</td>
//                 <td className="p-4 capitalize">{ebook.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {ebooks.length === 0 && (
//           <p className="p-5 text-slate-500">No ebooks found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

export default function AdminManageEbooksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Manage Ebooks</h1>
      <p className="text-slate-600">
        Admin can review and manage all ebooks here.
      </p>
    </div>
  );
}