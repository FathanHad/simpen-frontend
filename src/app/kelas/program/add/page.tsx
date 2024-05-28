"use client";

import { Breadcrumbs } from "../../../../components/breadcrumbs/breadcrumbs";
import { AddProgramForm } from "../../../../components/programPage/addProgramForm";

// import component

export default function App() {
  return (
    <main className="pb-24">
    <div className="px-[8vw] py-8">
      <Breadcrumbs />
      <AddProgramForm />
    </div>
    </main>
  );
}
