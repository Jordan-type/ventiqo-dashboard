import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/Layouts/page-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin page",
};

const Admin = () => {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi Jordan, Welcome back 👋
          </h2>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tickets</CardTitle>
              <div className="text-2xl font-bold text-green-500">
                250 <span className="text-sm">▲</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">Ticket stats over time graph here</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <div className="text-2xl font-bold text-red-500">
                600K <span className="text-sm">▼</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">Sales stats over time graph here</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <div className="text-2xl font-bold text-green-500">
                866 <span className="text-sm">▲</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">Revenue stats over time graph here</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Event Held</CardTitle>
              <div className="text-2xl font-bold">48,125</div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">Event stats here</div>
            </CardContent>
          </Card>
        </div>

        {/* Best Selling and Ticket Sold Today */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Best Selling Section */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Best Selling</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between md:flex-row">
              <div className="w-full md:w-1/2">
                {/* Placeholder for a Pie chart */}
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
                  Pie Chart
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-2">
                <p className="text-sm">21,456 Ticket Left</p>
                <p className="text-sm">48,125 Ticket Sold</p>
                <p className="text-sm">300 Event Held</p>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Sold Today Section */}
          <Card className="col-span-4 lg:col-span-3 bg-blue-500 text-white">
            <CardHeader>
              <CardTitle>Ticket Sold Today</CardTitle>
              <div className="text-xl font-bold">456,125 Pcs</div>
              <div className="mt-2 h-2 w-full rounded-lg bg-white">
                <div
                  className="h-2 rounded-lg bg-purple-500"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="mt-2 text-xs">4% increase since last day</p>
            </CardHeader>
            <CardContent>
              <p className="text-xs">
                Simply dummy text of the printing and typesetting industry.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Event List and Calendar */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Event List */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Event List</CardTitle>
              <CardDescription>Latest events on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src="/path/to/event.jpg"
                      className="h-16 w-16 rounded-lg object-cover"
                      alt="Event"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        International meetup Event
                      </p>
                      <p className="text-xs text-muted-foreground">Medan, USA</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm font-semibold">$124</p>
                      <p className="text-xs text-muted-foreground">
                        146 pcs left
                      </p>
                      <p className="text-xs text-muted-foreground">
                        24 Apr 2024
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar Section */}
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle>October 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full rounded-lg bg-gray-100">
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
