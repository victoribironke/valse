import PageLoader from "@/components/general/PageLoader";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getClassNamesByStatus } from "@/lib/utils";
import { db } from "@/services/firebase";
import { Incident, Status } from "@/types/dashboard";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const Incidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const filtered_incidents = incidents.filter((i) => i);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "incidents"), (d) => {
      const data = d.docs.map((doc) => doc.data() as Incident);

      setIncidents(data);
      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) return <PageLoader type="small" />;

  return (
    <section className="w-full max-w-[1440px] flex flex-col gap-4">
      <h1 className="font-bold text-2xl">ALL INCIDENTS</h1>

      <Input
        placeholder="Filter incidents..."
        className="max-w-96"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {/* <TableHead>
              <Checkbox />
            </TableHead> */}
            <TableHead>Status</TableHead>
            {/* <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered_incidents.map((f, i) => {
            const s = getClassNamesByStatus(
              f.status.toLowerCase().split(" ").join("_") as Status
            );

            return (
              <TableRow key={i}>
                {/* <TableCell>
                  <Checkbox />
                </TableCell> */}
                {/* <TableCell className="font-medium">{invoice.invoice}</TableCell> */}
                <TableCell>
                  <div className={s.main}>
                    <s.icon size={15} />
                    {f.status}
                  </div>
                </TableCell>
                {/* <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </section>
  );
};

export default Incidents;
