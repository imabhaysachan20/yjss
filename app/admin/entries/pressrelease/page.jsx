"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function PressReleaseAdmin() {
  const [pressReleases, setPressReleases] = useState([])
  const [form, setForm] = useState({ title: "", description: "", date: "" })
  const [pdfBase64, setPdfBase64] = useState("")

  const fetchPressReleases = async () => {
    const res = await fetch("/api/pressrelease")
    const data = await res.json()
    setPressReleases(data)
  }

  useEffect(() => {
    fetchPressReleases()
  }, [])

  // Convert uploaded file to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setPdfBase64(reader.result)
    }
    if (file) reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch("/api/pressrelease", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, pdfBase64 }),
    })
    setForm({ title: "", description: "", date: "" })
    setPdfBase64("")
    fetchPressReleases()
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Press Releases</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <Input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <Button type="submit">Add Press Release</Button>
      </form>

      <div className="grid gap-3">
        {pressReleases.map((p) => (
          <div
            key={p._id}
            className="border p-3 rounded-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.date}</p>
            </div>
            {p.pdfUrl && (
              <a href={p.pdfUrl} download={`${p.title}.pdf`} target="_blank">
                <Button variant="outline">Download PDF</Button>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PressReleaseAdmin
