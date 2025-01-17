import { IProjectJSON } from '@/types'
import Image from 'next/image'
import ProjectActionButtons from './project-action-btns'
import envConf from '@/lib/env.conf'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import Link from 'next/link'

type Project = {
  total: number
  limit: number
  page: number
  projects: IProjectJSON[]
}

interface Props{
  projects: Project,
  showActions?: boolean
}

const Portfolio = ({
  projects,
  showActions
}:Props) => {
  const {page, limit, total, projects:data} = projects

  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-teal-500">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data?.map((project) => (
            <div key={project.id||project._id.toString()} className="relative overflow-hidden group rounded-lg">
              <Image
                src={`${envConf.baseUrl}/api/files/${project.mainImage}`}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-auto transition duration-300 transform group-hover:scale-110"
              />
              <Dialog>
                <DialogTrigger>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <p className="text-white text-lg font-semibold">{project.title}</p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {project.title}
                    </DialogTitle>
                  </DialogHeader>
                  <Carousel>
                    <CarouselContent>
                      {
                        [project?.mainImage, ...(project?.otherImages ??[])]?.map((item, ind) =>(
                          <CarouselItem key={item + ind}>
                            <Image
                              src={`${envConf.baseUrl}/api/files/${item}`}
                              alt={`project item ${ind}`}
                              width={0}
                              height={0}
                              sizes='100vh'
                              className='w-full h-auto'
                              loading='eager'
                            />
                          </CarouselItem>
                        ))
                      }
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>

                  </Carousel>
                </DialogContent>
              </Dialog>
              <div className="absolute w-full bottom-0 z-10 bg-black bg-opacity-50 flex items-end justify-end gap-4 opacity-0 group-hover:opacity-100 transition duration-300">
                {
                  showActions && <ProjectActionButtons projectId={project.id ?? project._id} />
                }
              </div>
            </div>
          ))}
        </div>

        {
          page <= 1 && (page * limit >= total) ? null :
          <div className='flex justify-between items-center my-4'>
          <Button disabled={page <= 1}>
            <Link href={`?page=${page - 1}`}>Previous</Link>
          </Button>
          <Button disabled={page * limit >= total}>
            <Link href={`?page=${page + 1}`}>Next</Link>
          </Button>
        </div>
        }
      </div>
    </section>
  )
}

export default Portfolio

