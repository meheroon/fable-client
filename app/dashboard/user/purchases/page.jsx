// "use client";

// import { useEffect, useState } from "react";
// import useAuth from "@/hooks/useAuth";
// import useRole from "@/hooks/useRole";
// import useAxiosSecure from "@/hooks/useAxiosSecure";

// export default function UserPurchasesPage() {
//   const { user } = useAuth();
//   const { role, roleLoading } = useRole();
//   const axiosSecure = useAxiosSecure();

//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (roleLoading) return;

//     if (!user?.email || role !== "user") {
//       setLoading(false);
//       return;
//     }

//     axiosSecure
//       .get(`/purchases/${user.email}`)
//       .then((res) => setPurchases(res.data || []))
//       .catch(() => setPurchases([]))
//       .finally(() => setLoading(false));
//   }, [user?.email, role, roleLoading, axiosSecure]);

//   if (roleLoading || loading) {
//     return <p>Loading purchase history...</p>;
//   }

//   if (role !== "user") {
//     return <p className="text-red-600 font-bold">Forbidden Access</p>;
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-2">Purchase History</h1>
//       <p className="text-slate-600 mb-6">
//         Your purchased ebooks will show here.
//       </p>

//       {purchases.length === 0 ? (
//         <p className="text-slate-500">No purchases found.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-xl shadow">
//           <table className="w-full border-collapse">
//             <thead className="bg-slate-900 text-white">
//               <tr>
//                 <th className="p-3 text-left">Ebook</th>
//                 <th className="p-3 text-left">Writer</th>
//                 <th className="p-3 text-left">Price</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">Purchase Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {purchases.map((item) => (
//                 <tr key={item._id} className="border-b">
//                   <td className="p-3">{item.ebookTitle}</td>
//                   <td className="p-3">{item.writerEmail}</td>
//                   <td className="p-3">${item.price}</td>
//                   <td className="p-3 capitalize">{item.status}</td>
//                   <td className="p-3">
//                     {new Date(item.purchaseDate).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function UserPurchasesPage() {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roleLoading) return;

    if (!user?.email || role !== "user") {
      setLoading(false);
      return;
    }

    axiosSecure
      .get(`/purchases/${user.email}`)
      .then((res) => setPurchases(res.data || []))
      .catch(() => setPurchases([]))
      .finally(() => setLoading(false));
  }, [user?.email, role, roleLoading, axiosSecure]);

  if (roleLoading || loading) {
    return <p>Loading purchase history...</p>;
  }

  if (role !== "user") {
    return <p className="text-red-600 font-bold">Forbidden Access</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Purchase History</h1>
      <p className="text-slate-600 mb-6">
        Your purchased ebooks will show here.
      </p>

      {purchases.length === 0 ? (
        <p className="text-slate-500">No purchases found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full border-collapse">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-3 text-left">Ebook</th>
                <th className="p-3 text-left">Writer</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-3">{item.ebookTitle}</td>
                  <td className="p-3">{item.writerEmail}</td>
                  <td className="p-3">${item.price}</td>
                  <td className="p-3 capitalize">{item.status}</td>
                  <td className="p-3">
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}