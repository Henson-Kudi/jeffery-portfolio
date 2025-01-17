import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import dbConnect, { Project } from "@/lib/mongoose/models";
import { IProjectJSON } from "@/types";


export default async function Home({searchParams}: {searchParams: Promise<Record<string, string | string[]> & {page?: string}>}) {
  const {page} = await searchParams
  const pageNum = page && !isNaN(Number(page)) ? Number(page) : 1
  const limit = 10
  const skip = (pageNum -1 ) * limit

  await dbConnect()

  const total = await Project.countDocuments()
  const projects:IProjectJSON[] = (await Project.find({}, undefined, {
    limit,
    skip
  })).map(item => item.toJSON())

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Portfolio projects={{
          total,
          page: pageNum,
          limit,
          projects: JSON.parse(JSON.stringify(projects))
        }} />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

