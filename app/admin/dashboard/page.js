"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { FileText, ClipboardList, FileSpreadsheet, Award, ChevronRight } from 'lucide-react'

function DashboardPage() {
  const router = useRouter()

  const forms = [
    {
      title: "Support Form",
      description: "View and manage support form submissions",
      icon: FileText,
      link: "/admin/entries/supportForm",
      color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "ऑनलाइन सदास्यता",
      description: "Handle new membership applications",
      icon: ClipboardList,
      link: "/admin/entries/members",
      color: "text-green-500 bg-green-100 dark:bg-green-900/30"
    },
    {
      title: "पद आवेदन",
      description: "Manage position application submissions",
      icon: Award,
      link: "/admin/entries/padAvedan",
      color: "text-orange-500 bg-orange-100 dark:bg-orange-900/30"
    },
    {
      title: "सहयोग करें",
      description: "Track and manage donation submissions",
      icon: FileSpreadsheet,
      link: "/admin/entries/donation",
      color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "सक्रिय सदस्य",
      description: "Track and manage active member submissions",
      icon: FileSpreadsheet,
      link: "/admin/entries/active",
      color: "text-red-500 bg-red-100 dark:bg-red-900/30"
    },
    {
      title: "Contact US Form",
      description: "View and manage contact form submissions",
      icon: FileText,
      link: "/admin/entries/contact",
      color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30"
    }
  ]

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Forms Management</h2>

      <div className="border rounded-lg overflow-hidden">
        {forms.map((form, index) => {
          const Icon = form.icon
          return (
            <div
              key={form.title}
              className={`group grid grid-cols-[auto_minmax(150px,1fr)_minmax(200px,2fr)_auto] items-center gap-x-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${index < forms.length - 1 ? 'border-b' : ''}`}
              onClick={() => router.push(form.link)}
            >
              {/* Icon */}
              <div className={`p-2 rounded-lg ${form.color}`}>
                <Icon className="h-5 w-5" />
              </div>

              {/* Title */}
              <p className="font-semibold text-card-foreground truncate pr-2">{form.title}</p>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground truncate">{form.description}</p>

              {/* Chevron */}
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform justify-self-end" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPage