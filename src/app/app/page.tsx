"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { AppLayout } from "./_components/AppLayout";
import { BarChart3, Users, TrendingUp, DollarSign } from "lucide-react";

export default function AppPage() {
  // --------------------------------------------------
  // Sample Data
  // --------------------------------------------------
  
  const stats_data = [
    {
      id: "users",
      title: "Total Users",
      value: "12,428",
      change: "+12%",
      changeType: "positive",
      icon: Users,
    },
    {
      id: "revenue",
      title: "Revenue",
      value: "$89,432",
      change: "+8%",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      id: "analytics",
      title: "Page Views",
      value: "1.2M",
      change: "+15%",
      changeType: "positive",
      icon: BarChart3,
    },
    {
      id: "growth",
      title: "Growth Rate",
      value: "23.5%",
      change: "-2%",
      changeType: "negative",
      icon: TrendingUp,
    },
  ];

  const stats = {
    data: stats_data,
  };

  // --------------------------------------------------
  // Stats Grid Markup
  // --------------------------------------------------
  
  const statsGrid_markup = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.data.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <Card key={stat.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === "positive" 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );

  const statsGrid = {
    markup: statsGrid_markup,
  };

  // --------------------------------------------------
  // Main Chart Markup
  // --------------------------------------------------
  
  const mainChart_markup = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">Revenue Overview</h3>
        </CardHeader>
        <CardBody>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">User Activity</h3>
        </CardHeader>
        <CardBody>
          <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const mainChart = {
    markup: mainChart_markup,
  };

  // --------------------------------------------------
  // Recent Activity Markup
  // --------------------------------------------------
  
  const recentActivity_markup = (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  New user registration #{item}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2 minutes ago
                </p>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                #{String(item).padStart(4, "0")}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );

  const recentActivity = {
    markup: recentActivity_markup,
  };

  // --------------------------------------------------
  // Page Content Markup
  // --------------------------------------------------
  
  const pageContent_markup = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>
      
      {statsGrid.markup}
      {mainChart.markup}
      {recentActivity.markup}
    </div>
  );

  const pageContent = {
    markup: pageContent_markup,
  };

  // --------------------------------------------------
  // App Page Markup
  // --------------------------------------------------
  
  const appPage_markup = (
    <AppLayout>
        <div>
            <h1>Hello World</h1>
        </div>
    </AppLayout>
  );

  const appPage = {
    stats,
    statsGrid,
    mainChart,
    recentActivity,
    pageContent,
    markup: appPage_markup,
  };

  return appPage.markup;
}