"use client";

import React, { useState } from "react";

//import font and css
import { PoppinsBold, InterMedium, InterReguler } from "../../font/font";
import styles from "./addForm.module.css";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

//import component
import useFetchWithToken from "../../common/hooks/fetchWithToken";

export const AddForm = () => {
  const fetchWithToken = useFetchWithToken();
  const [error, setError] = useState("");
  const [succces, setSuccess] = useState("");
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    role: "",
    nama: "",
  });

  const { mutateAsync: addUserMutation, data: response } = useMutation({
    mutationFn: () =>
      fetchWithToken(`/user`, "POST", formState).then((res) => res.json()),
    onSuccess: (data) => {
      if (data.code == 200) {
        console.log(data.content);
        setSuccess("Sukses mendaftarkan.");
        setTimeout(() => {
          router.push("/user");
        }, 1000);
      } else if (data.code == 400) {
        setError("Email sudah pernah terdaftar.");
        setFormState({
          email: "",
          role: "",
          nama: "",
        });
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUserMutation();
  };

  return (
    <div className="">
      <div
        className={`${styles.heading} text-center my-10`}
        style={PoppinsBold.style}
      >
        Register Akun
      </div>
      <div className={`${styles.card_form} px-7 py-8 mb-12`}>
        <form onSubmit={handleSubmit}>
          <div>
            <div
              style={InterMedium.style}
              className={`${styles.form_title} mb-3`}
            >
              Email
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`${styles.form_placeholder} appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500  rounded-md focus:outline-none focus:ring-[#66A2DC] focus:border-[#66A2DC] focus:z-10`}
              placeholder="email"
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              value={formState.email}
              style={InterReguler.style}
            />
            <div
              style={InterReguler.style}
              className={`${styles.form_paragraph} mt-2`}
            >
              Email yang akan digunakan selama akun ini ada untuk login.
            </div>
          </div>
          <div className="mt-8">
            <div
              style={InterMedium.style}
              className={`${styles.form_title} mb-3`}
            >
              Nama Lengkap
            </div>
            <input
              id="full-name"
              name="name"
              type="name"
              autoComplete="name"
              required
              className={`${styles.form_placeholder} appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500  rounded-md focus:outline-none focus:ring-[#66A2DC] focus:border-[#66A2DC] focus:z-10`}
              placeholder="Nama Lengkap"
              onChange={(e) =>
                setFormState({ ...formState, nama: e.target.value })
              }
              value={formState.nama}
              style={InterReguler.style}
            />
            <div
              style={InterReguler.style}
              className={`${styles.form_paragraph} mt-2`}
            >
              Nama Lengkap ini digunakan sebagai pengidentifikasi selama akun
              ini ada.
            </div>
          </div>
          <div className="mt-8">
            <div
              style={InterMedium.style}
              className={`${styles.form_title} mb-3`}
            >
              Role
            </div>
            <select
              id="role"
              name="role"
              autoComplete="role"
              required
              className={`${styles.form_placeholder} appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-[#66A2DC] focus:border-[#66A2DC] focus:z-10`}
              value={formState.role}
              onChange={(e) =>
                setFormState({ ...formState, role: e.target.value })
              }
              style={InterReguler.style}
            >
              <option value="" disabled>
                Role
              </option>
              <option value="pengajar">Mitra Pengajar</option>
              <option value="operasional">Operasional</option>
              <option value="akademik">Akademik</option>
            </select>
          </div>
          <div className="mt-5">
            {succces && (
              <div
                className="bg-[#DAF8E6] text-[#004434] text-sm px-4 py-2"
                style={InterReguler.style}
              >
                {succces}
              </div>
            )}
            {error && (
              <div
                className="bg-[#ffcfcf] text-red-500 text-sm px-4 py-2"
                style={InterReguler.style}
              >
                {error}
              </div>
            )}
          </div>
          <div className="flex justify-center mt-9">
            <button
              type="submit"
              className={`${styles.button_tx} ${styles.btn} `}
              style={InterMedium.style}
            >
              Tambah Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
