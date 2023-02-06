import {ChartBarIcon, FireIcon, MapIcon, SunIcon, UserGroupIcon} from '@heroicons/react/24/outline'
function Categories() {
  return (
    <section className='category w-screen'>
        <div className='hidden lg:block bg-navbar w-full h-6'></div>
        <section className='my-12'>
          <article className='w-full pb-10'>
            <h3 className='text-4xl text-center text-title uppercase py-1 card-font-h3'>Maps Categories</h3>
            <p className='text-center text-light'>List of maps categories found in this project</p>
          </article>
          <section className='grid md:grid-cols-2 xl:grid-cols-4 gap-6 w-fit mx-auto'>
            <div className='card-category'>
              <UserGroupIcon className="card-category-icon"/>
              <h4 className='card-category-title'>Demography</h4>
              <p className='card-category-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae porro</p>
            </div>
            <div className='card-category'>
              <SunIcon className="card-category-icon"/>
              <h4 className='card-category-title'>Environment</h4>
              <p className='card-category-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae porro</p>
            </div>
            <div className='card-category'>
              <ChartBarIcon className="card-category-icon"/>
              <h4 className='card-category-title'>Epidemiology</h4>
              <p className='card-category-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae porro</p>
            </div>
            <div className='card-category'>
              <FireIcon className="card-category-icon"/>
              <h4 className='card-category-title'>Humanitarian</h4>
              <p className='card-category-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae porro</p>
            </div>
        </section>
        </section>
      </section>
  )
}

export default Categories