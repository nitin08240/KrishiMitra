// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import Navbar from '@/components/Navbar';
// import ChatBox from '@/components/ChatBox';
// import { 
//   MessageCircle, 
//   Cloud, 
//   Award, 
//   TrendingUp, 
//   Thermometer,
//   CloudRain,
//   Wind,
//   Sun
// } from 'lucide-react';

// const Dashboard = () => {
//   const [user] = useState({
//     name: 'राम कुमार',
//     location: 'Meerut, Uttar Pradesh',
//     farmSize: '5 acres',
//     crops: ['Wheat', 'Rice', 'Sugarcane']
//   });

//   // Mock data - replace with real API calls
//   const todayWeather = {
//     temperature: 28,
//     condition: 'Partly Cloudy',
//     humidity: 65,
//     windSpeed: 12
//   };

//   const quickStats = [
//     {
//       title: 'Today\'s Weather',
//       value: `${todayWeather.temperature}°C`,
//       description: todayWeather.condition,
//       icon: <Thermometer className="h-6 w-6 text-accent" />,
//       trend: '+2°C from yesterday'
//     },
//     {
//       title: 'Queries This Month',
//       value: '23',
//       description: 'AI responses',
//       icon: <MessageCircle className="h-6 w-6 text-primary" />,
//       trend: '+12 from last month'
//     },
//     {
//       title: 'Active Schemes',
//       value: '8',
//       description: 'Available for you',
//       icon: <Award className="h-6 w-6 text-earth" />,
//       trend: '3 new this week'
//     },
//     {
//       title: 'Farm Health',
//       value: '85%',
//       description: 'Overall score',
//       icon: <TrendingUp className="h-6 w-6 text-crop" />,
//       trend: '+5% improvement'
//     }
//   ];

//   const recentAlerts = [
//     {
//       type: 'weather',
//       message: 'Light rain expected tomorrow. Good for wheat watering.',
//       time: '2 hours ago',
//       priority: 'medium'
//     },
//     {
//       type: 'scheme',
//       message: 'New PM-KISAN installment available for verification.',
//       time: '1 day ago',
//       priority: 'high'
//     },
//     {
//       type: 'advisory',
//       message: 'Optimal time for fertilizer application in sugarcane.',
//       time: '2 days ago',
//       priority: 'low'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">
//             नमस्ते, {user.name}! 👋
//           </h1>
//           <p className="text-muted-foreground">
//             Welcome back to your farming dashboard. Here's what's happening with your farm today.
//           </p>
//           <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
//             <span>📍 {user.location}</span>
//             <span>🚜 {user.farmSize}</span>
//             <span>🌾 Growing: {user.crops.join(', ')}</span>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {quickStats.map((stat, index) => (
//             <Card key={index} className="hover:shadow-lg transition-shadow">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="p-2 bg-muted/50 rounded-lg">
//                     {stat.icon}
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
//                   <p className="text-sm text-muted-foreground mb-1">{stat.description}</p>
//                   <p className="text-xs text-crop">{stat.trend}</p>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Chat Section */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <MessageCircle className="h-5 w-5" />
//                   <span>AI Farming Assistant</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <ChatBox />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Quick Actions */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <Button className="w-full justify-start" variant="outline">
//                   <Cloud className="h-4 w-4 mr-2" />
//                   Check Weather
//                 </Button>
//                 <Button className="w-full justify-start" variant="outline">
//                   <Award className="h-4 w-4 mr-2" />
//                   Browse Schemes
//                 </Button>
//                 <Button className="w-full justify-start" variant="outline">
//                   <TrendingUp className="h-4 w-4 mr-2" />
//                   Market Prices
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Weather Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Sun className="h-5 w-5 text-sun" />
//                   <span>Today's Weather</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-bold">{todayWeather.temperature}°C</span>
//                     <span className="text-muted-foreground">{todayWeather.condition}</span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <CloudRain className="h-4 w-4 text-accent" />
//                       <span>{todayWeather.humidity}% Humidity</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Wind className="h-4 w-4 text-muted-foreground" />
//                       <span>{todayWeather.windSpeed} km/h</span>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm" className="w-full">
//                     View Full Forecast
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Recent Alerts */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Alerts</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {recentAlerts.map((alert, index) => (
//                     <div key={index} className="border-l-4 border-primary/20 pl-4">
//                       <p className="text-sm font-medium text-foreground">{alert.message}</p>
//                       <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
//                     </div>
//                   ))}
//                   <Button variant="ghost" size="sm" className="w-full">
//                     View All Alerts
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ChatBox from '@/components/ChatBox';
import { useAuth } from '@/hooks/useAuth';
import {
  MessageCircle,
  Cloud,
  Award,
  TrendingUp,
  Thermometer,
  CloudRain,
  Wind,
  Sun
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data - replace with real API calls if needed
  const todayWeather = {
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12
  };

  const quickStats = [
    {
      title: "Today's Weather",
      value: `${todayWeather.temperature}°C`,
      description: todayWeather.condition,
      icon: <Thermometer className="h-6 w-6 text-accent" />,
      trend: '+2°C from yesterday'
    },
    {
      title: 'Queries This Month',
      value: '23',
      description: 'AI responses',
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      trend: '+12 from last month'
    },
    {
      title: 'Active Schemes',
      value: '8',
      description: 'Available for you',
      icon: <Award className="h-6 w-6 text-earth" />,
      trend: '3 new this week'
    },
    {
      title: 'Farm Health',
      value: '85%',
      description: 'Overall score',
      icon: <TrendingUp className="h-6 w-6 text-crop" />,
      trend: '+5% improvement'
    }
  ];

  const recentAlerts = [
    {
      type: 'weather',
      message: 'Light rain expected tomorrow. Good for wheat watering.',
      time: '2 hours ago',
      priority: 'medium'
    },
    {
      type: 'scheme',
      message: 'New PM-KISAN installment available for verification.',
      time: '1 day ago',
      priority: 'high'
    },
    {
      type: 'advisory',
      message: 'Optimal time for fertilizer application in sugarcane.',
      time: '2 days ago',
      priority: 'low'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            नमस्ते, {user?.name || 'किसान'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Welcome back to your farming dashboard. Here's what's happening with your farm today.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            <span>📍 {user?.district || 'District'}, {user?.state || 'State'}</span>
            <span>✉️ {user?.email}</span>
            <span>📞 {user?.phone}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-muted/50 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mb-1">{stat.description}</p>
                  <p className="text-xs text-crop">{stat.trend}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>AI Farming Assistant</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ChatBox />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Cloud className="h-4 w-4 mr-2" />
                  Check Weather
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  Browse Schemes
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Market Prices
                </Button>
              </CardContent>
            </Card>

            {/* Weather Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-sun" />
                  <span>Today's Weather</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{todayWeather.temperature}°C</span>
                    <span className="text-muted-foreground">{todayWeather.condition}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CloudRain className="h-4 w-4 text-accent" />
                      <span>{todayWeather.humidity}% Humidity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-muted-foreground" />
                      <span>{todayWeather.windSpeed} km/h</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Forecast
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className="border-l-4 border-primary/20 pl-4">
                      <p className="text-sm font-medium text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;