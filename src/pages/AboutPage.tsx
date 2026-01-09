import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Award, Users, Clock, Shield, Wrench } from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    { year: '2008', title: 'Founded', description: 'Started our journey in Coimbatore' },
    { year: '2012', title: 'Expanded Services', description: 'Added chip-level repair capabilities' },
    { year: '2018', title: '10 Years', description: 'Celebrated a decade of excellence' },
    { year: '2025', title: '17+ Years', description: 'Continuing to serve with dedication' },
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Trust & Integrity',
      description: 'We believe in honest service and transparent pricing',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Quality Excellence',
      description: 'Using only genuine parts and expert techniques',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Quick Service',
      description: 'Fast turnaround without compromising quality',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const stats = [
    { number: '17+', label: 'Years Experience', color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { number: '1000+', label: 'Happy Customers', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { number: '4.9', label: 'Star Rating', color: 'bg-gradient-to-br from-orange-500 to-red-500' },
    { number: '100%', label: 'Genuine Parts', color: 'bg-gradient-to-br from-green-500 to-emerald-500' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-cyan-500 py-12 xl:py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              About Cyberdoctor
            </Badge>
            <h1 className="text-3xl xl:text-5xl font-bold text-white">
              Your Trusted Computer Service Partner Since 2008
            </h1>
            <p className="text-base xl:text-xl text-white/90">
              With over 17 years of experience, we've been serving Coimbatore with expert computer and laptop repair services, building trust one repair at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 xl:py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden">
                <CardContent className={`p-6 ${stat.color} text-white text-center`}>
                  <div className="text-3xl xl:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm xl:text-base opacity-90">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 xl:py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl xl:text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground text-base xl:text-lg">
                A journey of dedication, expertise, and customer satisfaction
              </p>
            </div>
            
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-8 xl:p-12">
                <div className="space-y-6 text-base xl:text-lg">
                  <p>
                    Founded in 2008, <span className="font-semibold text-primary">Cyberdoctor Computer & Laptop Service Center</span> began with a simple mission: to provide honest, reliable, and expert computer repair services to the people of Coimbatore.
                  </p>
                  <p>
                    What started as a small service center in Saravanampatti has grown into one of the most trusted names in computer repair, thanks to our commitment to quality and customer satisfaction. Our founder, <span className="font-semibold">Raam</span> (B.Sc, MCSE, RHCE, CCNA, A+, CEH), brought together technical expertise and a passion for helping people solve their technology problems.
                  </p>
                  <p>
                    Over the years, we've expanded our services to include advanced chip-level motherboard repairs, professional data recovery, and comprehensive hardware solutions. We've invested in the latest diagnostic equipment and continuously trained our technicians to stay ahead of technology trends.
                  </p>
                  <p className="text-primary font-semibold">
                    Today, with over 1000+ satisfied customers and a 4.9-star rating, we continue to serve with the same dedication and integrity that defined us from day one.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 xl:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl xl:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-base xl:text-lg">
              Key milestones in our 17+ year history
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="bg-white dark:bg-slate-900 border-2 hover:shadow-xl transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{milestone.year}</div>
                    <div className="font-semibold mb-2">{milestone.title}</div>
                    <div className="text-sm text-muted-foreground">{milestone.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 xl:py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl xl:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-base xl:text-lg">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden hover:scale-105 transition-transform">
                <CardContent className={`p-8 bg-gradient-to-br ${value.color} text-white`}>
                  <div className="flex items-start space-x-4">
                    <div className="shrink-0 bg-white/20 p-3 rounded-lg">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="opacity-90">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 xl:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl xl:text-4xl font-bold mb-4">Why Choose Cyberdoctor?</h2>
              <p className="text-muted-foreground text-base xl:text-lg">
                What sets us apart from the rest
              </p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {[
                'Expert technicians with 17+ years experience',
                'Chip-level motherboard repair specialists',
                'Professional data recovery services',
                'Genuine parts with warranty',
                'Doorstep service available',
                'Transparent pricing, no hidden charges',
                'Quick turnaround time',
                'Free diagnosis and consultation',
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-base xl:text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 xl:py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <Wrench className="h-16 w-16 mx-auto text-primary mb-4" />
              <h2 className="text-2xl xl:text-4xl font-bold mb-4">Meet Our Expert</h2>
            </div>
            
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-2xl">
              <CardContent className="p-8 xl:p-12">
                <h3 className="text-2xl xl:text-3xl font-bold mb-2">Raam</h3>
                <p className="text-lg mb-4 opacity-90">Founder & Lead Technician</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {['B.Sc', 'MCSE', 'RHCE', 'CCNA', 'A+', 'CEH'].map((cert) => (
                    <Badge key={cert} variant="secondary" className="bg-white/20 text-white border-white/30">
                      {cert}
                    </Badge>
                  ))}
                </div>
                <p className="text-base xl:text-lg opacity-90">
                  With multiple industry certifications and over 17 years of hands-on experience, Raam leads our team with expertise in advanced computer repairs, network security, and data recovery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
