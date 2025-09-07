'use client'
import { useFilter } from "@/store/FilterContext";
import { Plus, ArrowLeft, X, Filter } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { filterOpen, setFilterOpen } = useFilter();

    const handleBack = () => {
        router.push('/quizzes');
    }

    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center gap-2 ">
                <Image src="/icons/quiz.svg" className="cursor-pointer" alt="Quiz Icon" width={70} height={70} />
                <h1 className="font-bold text-2xl">Quiz Builder</h1>
            </div>
            {pathname === '/quizzes' &&
                <div className="flex gap-5 items-center">
                    <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 bg-[#6F51F8] w-max h-min p-2 text-xl font-medium rounded-md">
                        <Filter />
                        {!filterOpen ? "Filter" : "Hide"}
                    </button>
                    <div className="h-12 w-[0.5px] bg-white"></div>
                    <button className="gap-2 bg-[#6F51F8] flex items-center w-max h-min p-2 text-xl font-medium rounded-md">
                        <Link className="flex items-center gap-2" href="/create">
                            <Plus />
                            Add New
                        </Link>
                    </button>
                </div>
            }
            {pathname.startsWith('/quizzes/') && (
                <button onClick={handleBack} className="gap-2 bg-[#6F51F8] flex items-center w-max p-2 text-xl font-medium rounded-md">
                    <ArrowLeft />
                    Back
                </button>
            )}
            {pathname === ('/create') && (
                <button onClick={handleBack} className="gap-2 bg-[#6F51F8] flex items-center w-max p-2 text-xl font-medium rounded-md">
                    <X />
                    Cancel
                </button>
            )}
        </header>
    )
}

export default Header;