import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Search, 
  Filter, 
  Award, 
  Calendar, 
  CreditCard, 
  ExternalLink,
  Users,
  Target,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  category: string;
  eligibility: string[];
  amount: string;
  deadline: string;
  status: 'active' | 'upcoming' | 'expired';
  applicants: number;
  successRate: number;
}

const Schemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const schemes: Scheme[] = [
    {
      id: '1',
      name: 'PM-KISAN Samman Nidhi',
      nameHindi: 'प्रधानमंत्री किसान सम्मान निधि',
      description: 'Direct income support of ₹6,000 per year to small and marginal farmers',
      category: 'Financial Support',
      eligibility: ['Small & marginal farmers', 'Land ownership required', 'Below 2 hectares'],
      amount: '₹6,000/year',
      deadline: '2024-03-31',
      status: 'active',
      applicants: 125000,
      successRate: 92
    },
    {
      id: '2',
      name: 'Pradhan Mantri Fasal Bima Yojana',
      nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
      description: 'Crop insurance scheme to provide financial support in case of crop failure',
      category: 'Insurance',
      eligibility: ['All farmers', 'Crop cultivation required', 'Premium payment needed'],
      amount: 'Up to ₹2,00,000',
      deadline: '2024-04-15',
      status: 'active',
      applicants: 89000,
      successRate: 85
    },
    {
      id: '3',
      name: 'Kisan Credit Card',
      nameHindi: 'किसान क्रेडिट कार्ड',
      description: 'Easy access to credit for farmers to meet their cultivation needs',
      category: 'Credit',
      eligibility: ['Active farmers', 'Land documents', 'Good credit history'],
      amount: 'Up to ₹3,00,000',
      deadline: 'Ongoing',
      status: 'active',
      applicants: 156000,
      successRate: 78
    },
    {
      id: '4',
      name: 'Solar Pump Subsidy',
      nameHindi: 'सोलर पंप सब्सिडी योजना',
      description: 'Subsidized solar pumps for sustainable irrigation',
      category: 'Technology',
      eligibility: ['Registered farmers', 'Irrigation requirement', 'Land ownership'],
      amount: '90% subsidy',
      deadline: '2024-05-20',
      status: 'active',
      applicants: 34000,
      successRate: 88
    },
    {
      id: '5',
      name: 'Organic Farming Promotion',
      nameHindi: 'जैविक खेती प्रोत्साहन योजना',
      description: 'Financial assistance for farmers adopting organic farming practices',
      category: 'Sustainable Agriculture',
      eligibility: ['Minimum 1 acre', 'Organic certification', 'Training completion'],
      amount: '₹50,000/hectare',
      deadline: '2024-06-30',
      status: 'upcoming',
      applicants: 12000,
      successRate: 94
    }
  ];

  const categories = ['all', 'Financial Support', 'Insurance', 'Credit', 'Technology', 'Sustainable Agriculture'];
  const statuses = ['all', 'active', 'upcoming', 'expired'];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.nameHindi.includes(searchTerm) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || scheme.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || scheme.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-crop text-crop-foreground';
      case 'upcoming': return 'bg-accent text-accent-foreground';
      case 'expired': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'upcoming': return <Clock className="h-4 w-4" />;
      case 'expired': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Government Schemes for Farmers
          </h1>
          <p className="text-muted-foreground">
            Discover and apply for government schemes and subsidies designed to support farmers
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search schemes by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredSchemes.length} of {schemes.length} schemes
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{scheme.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{scheme.nameHindi}</p>
                    <Badge variant="secondary" className="mb-2">
                      {scheme.category}
                    </Badge>
                  </div>
                  <Badge className={`${getStatusColor(scheme.status)} flex items-center space-x-1`}>
                    {getStatusIcon(scheme.status)}
                    <span className="capitalize">{scheme.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{scheme.description}</p>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="text-sm font-semibold">{scheme.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-earth" />
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="text-sm font-semibold">{scheme.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Applicants</p>
                      <p className="text-sm font-semibold">{scheme.applicants.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-crop" />
                    <div>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                      <p className="text-sm font-semibold">{scheme.successRate}%</p>
                    </div>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Eligibility:</p>
                  <div className="flex flex-wrap gap-1">
                    {scheme.eligibility.map((criteria, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {criteria}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Award className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredSchemes.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No schemes found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find relevant schemes.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Schemes;