"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ClipboardList, FileSpreadsheet,Award } from 'lucide-react'

function DashboardPage() {
  const router = useRouter()

  const forms = [
    {
      title: "Support Form",
      description: "View and manage support form submissions",
      icon: FileText,
      link: "/admin/entries/supportForm",
      color: "text-blue-500"
    },
    {
      title: "ऑनलाइन सदास्यता",
      description: "Handle new membership applications",
      icon: ClipboardList,
      link: "/admin/entries/members",
      color: "text-green-500"
    },
    {
      title: "पद आवेदन",
      description: "Manage position application submissions",
      icon: Award,
      link: "/admin/entries/padAvedan",
      color: "text-orange-500"
    },
    {
      title: "सहयोग करें",
      description: "Track and manage donation submissions",
      icon: FileSpreadsheet,
      link: "/admin/entries/donation",
      color: "text-purple-500"
    },
    {
      title: "सक्रिय सदस्य",
      description: "Track and manage donation submissions",
      icon: FileSpreadsheet,
      link: "/admin/entries/active",
      color: "text-purple-500"
    }
    ,
    {
      title: "Contact US Form",
      description: "Track and manage donation submissions",
      icon: FileSpreadsheet,
      link: "/admin/entries/contact",
      color: "text-purple-500"
    }
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Forms Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => {
          const Icon = form.icon
          return (
            <Card key={form.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className={`h-6 w-6 ${form.color}`} />
                  <CardTitle>{form.title}</CardTitle>
                </div>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => router.push(form.link)}
                >
                  View Entries
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPage
 