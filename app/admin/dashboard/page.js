"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ClipboardList, FileSpreadsheet, Award, ChevronRight } from 'lucide-react'

function DashboardPage() {
  const router = useRouter()

  const forms = [
    {
      title: "Support Form",
      description: "View and manage support form submissions",
      icon: FileText,
      link: "/admin/entries/supportForm",
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "ऑनलाइन सदास्यता",
      description: "Handle new membership applications",
      icon: ClipboardList,
      link: "/admin/entries/members",
      color: "text-green-500 bg-green-50"
    },
    {
      title: "पद आवेदन",
      description: "Manage position application submissions",
      icon: Award,
      link: "/admin/entries/padAvedan",
      color: "text-orange-500 bg-orange-50"
    },
    {
      title: "सहयोग करें",
      description: "Track and manage donation submissions",
      icon: FileSpreadsheet,
      link: "/admin/entries/donation",
      color: "text-purple-500 bg-purple-50"
    },
    {
      title: "सक्रिय सदस्य",
      description: "Track and manage active member submissions",
      icon: FileSpreadsheet,
      link: "/admin/entries/active",
      color: "text-red-500 bg-red-50"
    }
    ,
    {
      title: "Contact US Form",
      description: "View and manage contact form submissions",
      icon: FileText,
      link: "/admin/entries/contact",
      color: "text-indigo-500 bg-indigo-50"
    }
  ]

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Forms Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {forms.map((form) => {
          const Icon = form.icon
          return (
            <div
              key={form.title}
              className="group flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:border-primary transition-all duration-200 cursor-pointer bg-card"
              onClick={() => router.push(form.link)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${form.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">{form.title}</p>
                  <p className="text-sm text-muted-foreground">{form.description}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPage