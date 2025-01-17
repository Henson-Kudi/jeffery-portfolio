import { cookies } from 'next/headers'
import Portfolio from '@/components/Portfolio'
import dbConnect, { Project } from '@/lib/mongoose/models'
import { IProjectJSON } from '@/types'
import ProjectPage from './components/project-page'

export default async function AdminPage({searchParams}: {searchParams: Promise<Record<string, string | string[]> & {page?: string, add?: string}>}) {
  const userName = (await cookies()).get('userName')?.value


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
    <ProjectPage>
        <p className="mb-8">Welcome, {userName}!</p>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <Portfolio showActions={true} projects={{
        total,
        limit,
        projects: JSON.parse(JSON.stringify(projects)),
        page: pageNum
        }} />
    </ProjectPage>
  )
}

