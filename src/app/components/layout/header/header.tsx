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
        <header className="flex items-center justify-between p-2 md:p-5">
            <div className="flex items-center gap-2">
                <Image src="/icons/quiz.svg" className="cursor-pointer" alt="Quiz Icon" width={50} height={50} />
                <h1 className="font-bold text-xl md:text-2xl">Quiz Builder</h1>
            </div>

            {pathname === '/quizzes' && (
                <div className="flex flex-col gap-2 h-12 md:flex-row md:gap-5 md:items-center">
                    <button 
                        onClick={() => setFilterOpen(!filterOpen)} 
                        className="flex items-center gap-1 px-2 py-1 text-sm md:px-4 md:py-2 md:text-xl bg-[#6F51F8] rounded-md"
                    >
                        <Filter className="w-4 h-4 md:w-5 md:h-5" />
                        {!filterOpen ? "Filter" : "Hide"}
                    </button>
                    <div className="hidden md:flex h-14 w-[1px] bg-white"></div>
                    <button className="flex items-center gap-1 px-2 py-1 text-sm md:px-4 md:py-2 md:text-xl bg-[#6F51F8] rounded-md">
                        <Link className="flex items-center gap-1" href="/create">
                            <Plus className="w-4 h-4 md:w-5 md:h-5" />
                            Add New
                        </Link>
                    </button>
                </div>
            )}

            {pathname.startsWith('/quizzes/') && (
                <button 
                    onClick={handleBack} 
                    className="flex items-center gap-1 px-2 py-1 text-sm md:px-4 md:py-2 md:text-xl bg-[#6F51F8] rounded-md"
                >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                    Back
                </button>
            )}

            {pathname === '/create' && (
                <button 
                    onClick={handleBack} 
                    className="flex items-center gap-1 px-2 py-1 text-sm md:px-4 md:py-2 md:text-xl bg-[#6F51F8] rounded-md"
                >
                    <X className="w-4 h-4 md:w-5 md:h-5" />
                    Cancel
                </button>
            )}
        </header>
    )
}

export default Header;
