import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Organizer",
    description: "Organizer page",
};

const Admin = () => {
    return (
        <DefaultLayout>
        <h1>Admin Page</h1>

        </DefaultLayout>
    );
}

export default Admin;