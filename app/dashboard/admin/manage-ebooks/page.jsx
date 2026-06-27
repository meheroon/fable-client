// "use client";

// import { useEffect, useState } from "react";
// import RoleRoute from "@/components/shared/RoleRoute";
// import useAxiosSecure from "@/hooks/useAxiosSecure";

// export default function AdminManageEbooksPage() {
//   const axiosSecure = useAxiosSecure();
//   const [ebooks, setEbooks] = useState([]);

//   useEffect(() => {
//     axiosSecure.get("/ebooks").then((res) => {
//       setEbooks(res.data?.ebooks || res.data || []);
//     });
//   }, [axiosSecure]);

//   return (
//     <RoleRoute allowedRole="admin">
//       <section>
//         <h1 className="text-3xl font-bold">Manage Ebooks</h1>
//         <p className="mt-2 text-slate-600">Admin can review and manage all ebooks here.</p>

//         <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
//           <table className="w-full">
//             <thead className="bg-slate-950 text-white">
//               <tr>
//                 <th className="p-4 text-left">Title</th>
//                 <th className="p-4 text-left">Writer</th>
//                 <th className="p-4 text-left">Genre</th>
//                 <th className="p-4 text-left">Price</th>
//                 <th className="p-4 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ebooks.map((ebook) => (
//                 <tr key={ebook._id} className="border-b">
//                   <td className="p-4">{ebook.title}</td>
//                   <td className="p-4">{ebook.writerEmail}</td>
//                   <td className="p-4">{ebook.genre}</td>
//                   <td className="p-4">${ebook.price}</td>
//                   <td className="p-4 capitalize">{ebook.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {ebooks.length === 0 && <p className="p-5">No ebooks found.</p>}
//         </div>
//       </section>
//     </RoleRoute>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import RoleRoute from "@/components/shared/RoleRoute";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function AdminManageEbooksPage() {
  const axiosSecure = useAxiosSecure();
  const [ebooks, setEbooks] = useState([]);

  useEffect(() => {
    axiosSecure.get("/ebooks").then((res) => {
      setEbooks(res.data?.ebooks || res.data || []);
    });
  }, [axiosSecure]);

  return (
    <RoleRoute allowedRole="admin">
      <section>
        <h1 className="text-3xl font-bold">Manage Ebooks</h1>
        <p className="mt-2 text-slate-600">
          Admin can review and manage all ebooks here.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Writer</th>
                <th className="p-4 text-left">Genre</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ebooks.map((ebook) => (
                <tr key={ebook._id} className="border-b">
                  <td className="p-4">{ebook.title}</td>
                  <td className="p-4">{ebook.writerEmail}</td>
                  <td className="p-4">{ebook.genre}</td>
                  <td className="p-4">${ebook.price}</td>
                  <td className="p-4 capitalize">{ebook.status}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                        Edit
                      </button>
                      <button className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {ebooks.length === 0 && <p className="p-5">No ebooks found.</p>}
        </div>
      </section>
    </RoleRoute>
  );
}