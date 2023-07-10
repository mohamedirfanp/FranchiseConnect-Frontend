import { Card } from 'primereact/card'
import React from 'react'

function AboutCard({franchise}) {

    const franchiseDetail = franchise.franchise;
    const header = (
        <header className='flex justify-between'>
            <span className='p-3'>
                <h1 className='text-2xl font-semibold'>{franchiseDetail.franchiseName}</h1>
                <span>{franchiseDetail.franchiseIndustry}</span>
            </span>
            {/* <span className='p-3'>
                <p className='flex gap-1 items-center justify-end pb-2'>
                    <FontAwesomeIcon icon={faLocationPin} style={{color : 'red'}} />
                    {franchiseDetail.franchiseSegment}</p>
                <span className='grid grid-cols-5 gap-2'>
                    <Tooltip target=".custom-target-email-icon" position='top' />
                    <i className="custom-target-email-icon pi pi-envelope" style={{ fontSize: '1.3rem', color: '#6366F1' }} data-pr-tooltip={franchiseSocial.franchiseEmail}></i>

                    {
                        franchiseSocial.franchiseWebsite !== '' ? <div>
                            <Tooltip target=".custom-target-globe-icon" position='top' />
                            <i className="custom-target-globe-icon pi pi-globe" style={{ fontSize: '1.3rem', color: '#6366F1' }} data-pr-tooltip={franchiseSocial.franchiseWebsite} ></i>
                        </div> : <i className="pi pi-globe"
                            style={
                                { fontSize: '1.3rem' }
                            }></i>
                    }

                    {
                        franchiseSocial.franchiseFacebook !== '' ? <div>
                            <Tooltip target=".custom-target-facebook-icon" position='top' />
                            <i className="custom-target-facebook-icon pi pi-facebook" style={{ fontSize: '1.3rem', color: '#6366F1' }} data-pr-tooltip={franchiseSocial.franchiseFacebook} ></i>
                        </div> : <i className="pi pi-facebook"
                        style={
                            { fontSize: '1.3rem' }
                        }></i>
                    }

                    {
                        franchiseSocial.franchiseTwitter !== '' ? <div>
                            <Tooltip target=".custom-target-twitter-icon" position='top' />
                            <i className="custom-target-twitter-icon pi pi-twitter" style={{ fontSize: '1.3rem', color: '#6366F1' }} data-pr-tooltip={franchiseSocial.franchiseTwitter} ></i>
                        </div> : <i className="pi pi-twitter"
                        style={
                            { fontSize: '1.3rem' }
                        }></i>

                    }
                     {
                        franchiseSocial.franchiseInstagram !== '' ? <div>
                            <Tooltip target=".custom-target-instagram-icon" position='top' />
                            <i className="custom-target-instagram-icon pi pi-instagram" style={{ fontSize: '1.3rem', color: '#6366F1' }} data-pr-tooltip={franchiseSocial.franchiseInstagram} ></i>
                        </div> : <i className="pi pi-instagram"
                        style={
                            { fontSize: '1.3rem' }
                        }></i>

                    }
                
                </span>
            </span> */}
        </header>
    );

  return (
    <section className='p-5'>
        <Card header={header}>
            <section className='-mt-9'>
                    <div>
                        <h3 className='text-lg font-bold'>About</h3>
                        <p>{franchiseDetail.franchiseAbout.substring(0,200)}...</p>
                    </div>
                    <br></br>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5'>
                        <span>
                            <p className='font-bold'>Investment Req.</p>
                            <p>Rs. {franchiseDetail.franchiseInvestment}</p>
                        </span>
                        <span>
                            <p className='font-bold'>Space Req.</p>
                            <p>{franchiseDetail.franchiseSpace} Sq.ft</p>
                        </span>
                        <span>
                            <p className='font-bold'>Franchise Outlets</p>
                            <p>{franchiseDetail.franchiseCurrentCount}</p>
                        </span>
                        <span>
                            <p className='font-bold'>View Count</p>
                            <p className='flex items-center gap-1'>{franchiseDetail.franchiseViewCount} <icon className="pi pi-eye "></icon></p>
                        </span>
                    </div>
                    <article className='flex gap-1 mt-3'>
                        <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 m-1 animate-pulse'></span>
                        <p className='text-[#6366F1] font-light'>For More Information visit Account Page</p>
                    </article>
                    
            </section>
        </Card>
    </section>
  )
}

export default AboutCard;