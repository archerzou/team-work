"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";
import { Sheet,SheetTitle, SheetContent, SheetTrigger } from "./ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);
    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <VisuallyHidden.Root>
                <SheetTitle>
                    Menu
                </SheetTitle>
            </VisuallyHidden.Root>
            <SheetTrigger asChild>
                <Button variant="secondary" className="lg:hidden">
                    <MenuIcon className="size-4 text-neutral-500" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};