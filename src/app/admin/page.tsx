import Image from "next/image";
import { Metadata } from "next";
import PageContainer from "@/components/Layouts/page-container";
import RecentEventList from "@/components/Forms/EventForms/recent-event-list"; 
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger  } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Ventiqo Admin Dashboard",
  description: "Manage and monitor all aspects of Ventiqo's event platform, including events, users, payments, and analytics. The admin panel provides powerful tools and insights to ensure smooth event operations and effective platform management."
};

const Admin = () => {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-6">
        {/* Dashboard Overview */}
        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
          <Card className="border">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tickets</CardTitle>
              <div className="text-2xl font-bold text-green-500">
                250K <span className="text-sm">▲</span>
              </div>
            </CardHeader>
            <CardContent className="h-16">
              <div className="text-sm">Graph or stats here</div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <div className="text-2xl font-bold text-red-500">
                600K <span className="text-sm">▼</span>
              </div>
            </CardHeader>
            <CardContent className="h-16">
              <div className="text-sm">Sales graph or stats here</div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <div className="text-2xl font-bold text-green-500">
                866K <span className="text-sm">▲</span>
              </div>
            </CardHeader>
            <CardContent className="h-16">
              <div className="text-sm">Revenue graph or stats here</div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Event Held</CardTitle>
              <div className="text-2xl font-bold">48,125</div>
            </CardHeader>
            <CardContent className="h-16">
              <div className="text-sm">Event held statistics</div>
            </CardContent>
          </Card>
        </div>

        {/* Best Selling Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border">
            <CardHeader>
              <CardTitle>Best Selling</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="w-1/3">
                <div className="flex h-24 w-24 items-center justify-center bg-gray-100 rounded-full">
                  Chart
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-2">
                <p className="text-sm">21,456 Tickets Left</p>
                <p className="text-sm">48,125 Tickets Sold</p>
                <p className="text-sm">300 Events Held</p>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Sold Today */}
          <Card className="border">
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle>Ticket Sold Today</CardTitle>
              <div className="text-xl font-bold">456,125 Pcs</div>
              <div className="mt-2 h-2 w-full rounded-lg bg-white">
                <div
                  className="h-2 rounded-lg bg-purple-500"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="mt-2 text-xs">4% increase since yesterday</p>
            </CardHeader>
            <CardContent>
              <p className="text-xs">
                Placeholder for further ticket statistics here.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Event List and Calendar */}
        <div className="grid gap-6 lg:grid-cols-2">
        <RecentEventList /> {/* Use the RecentEventList component here */}


          {/* Calendar */}
          <Card className="border">
            <CardHeader>
              <CardTitle>October 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-gray-100 rounded-lg">
                Calendar Placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Admin;
