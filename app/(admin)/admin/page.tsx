"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          Admin Dashboard
        </h1>
        <Button asChild>
          <Link href="/admin/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Component
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 space-y-2">
          <h3 className="font-medium text-foreground">Components</h3>
          <p className="text-sm text-muted-foreground">
            Manage all components in the library.
          </p>
          <Button variant="outline" size="sm" asChild className="w-full mt-4">
            <Link href="/admin/components">View Components</Link>
          </Button>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-2">
          <h3 className="font-medium text-foreground">Sources</h3>
          <p className="text-sm text-muted-foreground">
            Manage data sources and integrations.
          </p>
          <Button variant="outline" size="sm" asChild className="w-full mt-4">
            <Link href="/admin/sources">View Sources</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
