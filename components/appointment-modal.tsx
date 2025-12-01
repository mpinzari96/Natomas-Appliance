"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentCard } from "@/components/appointment-card"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"

interface AppointmentModalProps {
  children?: React.ReactNode
  buttonText?: string
  buttonVariant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  fullWidth?: boolean
  className?: string
}

export function AppointmentModal({
  children,
  buttonText = "Schedule Service",
  buttonVariant = "default",
  buttonSize = "default",
  fullWidth = false,
  className,
}: AppointmentModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("options")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className={`${fullWidth ? "w-full" : ""} ${className || ""}`}
          >
            <Calendar className="mr-2 h-4 w-4" /> {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule an Appointment</DialogTitle>
          <DialogDescription>Choose a convenient time for your diagnostic appointment.</DialogDescription>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="options">Service Options</TabsTrigger>
            <TabsTrigger value="quote">Get a Free Quote</TabsTrigger>
          </TabsList>

          <TabsContent value="options" className="mt-4">
            <div className="mx-auto max-w-md">
              <AppointmentCard
                title="Diagnostic Appointment"
                duration="2 hrs"
                price="$80"
                description="A $20 deposit is required to book this appointment"
                variant="outline"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              The diagnostic fee will be applied toward the cost of repairs if you choose to proceed with our service.
            </p>
          </TabsContent>

          <TabsContent value="quote" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <ContactForm webhookUrl="https://primary-production-e3b4e.up.railway.app/webhook/06a97321-2604-48d8-ab48-8148b90814a5" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
