'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard, LuFactory, LuShoppingBasket, LuPackage, LuShoppingCart } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import Title from "./text/Title";
import Text from "./text/Text";
import { FaReceipt, FaWallet } from "react-icons/fa";
import Button from "./Button";
import { useTransition } from "react";
import { logout } from "../actions/auth";
import { TbReport } from "react-icons/tb";

export default function Navbar({user}: {
  user: {id: number, name: string, role: string} | null
}) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LuLayoutDashboard },
    { name: "Производство", href: "/production", icon: LuFactory },
    { name: "Закупка сырья", href: "/purchases", icon: LuShoppingBasket },
    { name: "Склад", href: "/material", icon: LuPackage },
    { name: "Продажа", href: "/productSales", icon: LuShoppingCart },
    { name: "Рецептура", href: "/receipt", icon: FaReceipt },
    { name: "Бюджет", href: "/budget", icon: FaWallet },
  ];

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
  });
  }

  return (
    <>
      {user && (
        <nav className="
          bg-[#1A365D] text-white w-64 min-h-screen p-5 
          flex flex-col justify-between
        ">
          <div>
            <Title className="text-2xl mt-4">
              Foundation
            </Title>
            <ul className="space-y-2 mt-6">
              {menuItems.map(i => {
                const isActive = pathname === i.href;
                return (
                <li key={i.href}>
                  <Link href={i.href} className={`flex items-center gap-2 p-3 rounded-lg
                    ${isActive ? "bg-[#3182CE] text-white" : "text-gray-400 hover:bg-[#2c4e75] hover:text-white"}
                  `}>
                    <i.icon size={20}/>
                    {i.name}
                  </Link>
                </li>
              )})}
              {user.role === "Admin" && (
                <li>
                  <Link 
                    href="/report" 
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      pathname === "/report" 
                        ? "bg-[#3182CE] text-white" 
                        : "text-gray-400 hover:bg-[#2c4e75] hover:text-white"
                    }`}
                  >
                    <TbReport size={20} />
                    Отчет
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="flex gap-3 flex-col">
          <div className="flex gap-3 justify-center items-center">
            <CgProfile size={30}/>
            <div>
              <Text>{user?.name}</Text>
              <Text className="text-sm text-gray-400 block">{user?.role}</Text>
            </div>
          </div>
            <button onClick={handleLogout} className="!bg-red-600 p-3 rounded-2xl mx-auto">
              {isPending ? "Выходим..." : "Выход"}
            </button>
          </div>
        </nav>
      )}
    </>
  )
}