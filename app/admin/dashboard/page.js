"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ClipboardList, FileSpreadsheet, Award,UserSquare } from 'lucide-react'

function DashboardPage() {
  const router = useRouter()

  const forms = [
    {
      title: "Support Form",
      description: "Manage support form submissions.",
      icon: FileText,
      link: "/admin/entries/supportForm",
      color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "ऑनलाइन सदास्यता",
      description: "Handle new membership applications.",
      icon: ClipboardList,
      link: "/admin/entries/members",
      color: "text-green-500 bg-green-100 dark:bg-green-900/30"
    },
    // {
    //   title: "पद आवेदन",
    //   description: "Manage position applications.",
    //   icon: Award,
    //   link: "/admin/entries/padAvedan",
    //   color: "text-orange-500 bg-orange-100 dark:bg-orange-900/30"
    // },
    {
      title: "सहयोग करें",
      description: "Track and manage donations.",
      icon: FileSpreadsheet,
      link: "/admin/entries/donation",
      color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "सक्रिय सदस्य",
      description: "Manage active member submissions.",
      icon: FileSpreadsheet,
      link: "/admin/entries/active",
      color: "text-red-500 bg-red-100 dark:bg-red-900/30"
    },
    {
      title: "Contact US Form",
      description: "Manage contact form submissions.",
      icon: FileText,
      link: "/admin/entries/contact",
      color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30"
    },
    // {
    //   title: "कार्यकारिणी एवं पदाधिकारियों ",
    //   description: "Add and Manage organization form .",
    //   icon: UserSquare,
    //   link: "/admin/entries/organization",
    //   color: "text-teal-500 bg-teal-100 dark:bg-teal-900/30"
    // },
    // {
    //   title: "कार्यकारिणी एवं पदाधिकारियों ",
    //   description: "Add and Manage organization form .",
    //   icon: UserSquare,
    //   link: "/admin/entries/pressrelease",
    //   color: "text-teal-500 bg-teal-100 dark:bg-teal-900/30"
    // }
  ]

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Forms Management</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {forms.map((form) => {
          const Icon = form.icon
          return (
            <Card 
              key={form.title} 
              className="flex flex-col justify-between text-center items-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              onClick={() => router.push(form.link)}
            >
              <CardHeader className="items-center">
                <div className={`p-3 rounded-lg ${form.color} w-fit mb-3`}>
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-sm font-semibold">{form.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground px-2">{form.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPage