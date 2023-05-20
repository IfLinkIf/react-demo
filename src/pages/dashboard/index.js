import Bar from "@/componments/Bar"

function Dashboard () {
 return (
  <div>
   <Bar
    style={{ width: '500px', height: '400px' }}
    xData={['vue', 'angular', 'react']}
    sData={[50, 60, 70]}
    title='三大框架满意度' />

   <Bar
    style={{ width: '500px', height: '400px' }}
    xData={['vue', 'angular', 'react']}
    sData={[50, 60, 70]}
    title='三大框架使用度' />
  </div>
 )
}

export default Dashboard