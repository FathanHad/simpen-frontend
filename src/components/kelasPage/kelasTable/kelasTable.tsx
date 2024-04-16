import React from "react";
import { useQuery } from "react-query";
import useFetchWithToken from "../../../common/hooks/fetchWithToken";
import { KelasRead } from "../../../common/types/kelas";
import Loading from "../../../common/components/Loading";
import { DataTable as DataTableKelasOps } from "./operasional/kelas-data-table";
import { columns as ColumnsKelasOps } from "./operasional/columns";
import { DataTable as DataTableKelasPengajar } from "./pengajar/kelas-data-table";
import { columns as ColumnsKelasPengajar } from "./pengajar/columns";
import { useAuthContext } from "../../../common/utils/authContext";
import Link from "next/link";

export const KelasTable = () => {
  const fetchWithToken = useFetchWithToken();
  const { pengguna } = useAuthContext();

  const { isLoading, error, data } = useQuery({
    queryKey: ["kelas"],
    queryFn: () => fetchWithToken("/kelas").then((res) => res.json()),
  });

  if (isLoading) {
    return <Loading />;
  }
  const listKelas: KelasRead[] = data.content;

  if (
    pengguna.role === "operasional" ||
    pengguna.role === "akademik" ||
    pengguna.role === "superadmin"
  ) {
    return (
      <div className="flex flex-col space-y-8 my-10">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-6xl font-bold text-neutral/100">Daftar Kelas</h1>
          <Link href="/kelas/add">
            <button className="px-4 py-2 bg-primary/80 hover:bg-primary text-white rounded">
              + Tambah Kelas
            </button>
          </Link>
        </div>

        <DataTableKelasOps columns={ColumnsKelasOps} data={listKelas} />
      </div>
    );
  }

  if (pengguna.role === "pengajar") {
    return (
      <div className="flex flex-col space-y-8 my-10">
        <h1 className=" flex justify-start text-6xl font-bold text-neutral/100 ">
          Daftar Kelas Pengajaran
        </h1>
        <DataTableKelasPengajar
          columns={ColumnsKelasPengajar}
          data={listKelas}
        />
      </div>
    );
  }
};
