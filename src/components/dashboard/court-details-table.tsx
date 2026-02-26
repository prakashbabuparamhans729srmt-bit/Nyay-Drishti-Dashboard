"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const courtData = [
  {
    name: "सुप्रीम कोर्ट",
    pending: "78,342",
    new: "8,234",
    disposed: "7,891",
    rate: 95,
    posts: "34/34",
    status: "success",
  },
  {
    name: "इलाहाबाद उच्च न्यायालय",
    pending: "8,92,345",
    new: "1,23,456",
    disposed: "98,234",
    rate: 79,
    posts: "120/160",
    status: "critical",
  },
  {
    name: "मद्रास उच्च न्यायालय",
    pending: "4,56,789",
    new: "67,890",
    disposed: "56,789",
    rate: 83,
    posts: "85/100",
    status: "warning",
  },
  {
    name: "बॉम्बे उच्च न्यायालय",
    pending: "5,23,456",
    new: "78,901",
    disposed: "67,890",
    rate: 86,
    posts: "94/110",
    status: "warning",
  },
  {
    name: "दिल्ली उच्च न्यायालय",
    pending: "3,89,234",
    new: "56,789",
    disposed: "52,345",
    rate: 92,
    posts: "60/60",
    status: "success",
  },
];

export function CourtDetailsTable() {
  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">न्यायालयवार विवरण तालिका</CardTitle>
        <Button variant="outline" size="sm" className="gap-2">
          सभी देखें <ExternalLink className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">न्यायालय</TableHead>
              <TableHead className="text-right font-bold">लंबित</TableHead>
              <TableHead className="text-right font-bold">नए मामले</TableHead>
              <TableHead className="text-right font-bold">निस्तारित</TableHead>
              <TableHead className="text-right font-bold">दर (%)</TableHead>
              <TableHead className="text-center font-bold">स्वीकृत पद</TableHead>
              <TableHead className="text-center font-bold">स्थिति</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courtData.map((court) => (
              <TableRow key={court.name} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{court.name}</TableCell>
                <TableCell className="text-right">{court.pending}</TableCell>
                <TableCell className="text-right">{court.new}</TableCell>
                <TableCell className="text-right">{court.disposed}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden hidden sm:block">
                      <div 
                        className={`h-full ${court.rate > 90 ? 'bg-green-600' : court.rate > 80 ? 'bg-amber-500' : 'bg-destructive'}`} 
                        style={{ width: `${court.rate}%` }}
                      />
                    </div>
                    {court.rate}%
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="font-mono">{court.posts}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <span className={`h-3 w-3 rounded-full animate-pulse ${
                      court.status === 'success' ? 'bg-green-600' : 
                      court.status === 'warning' ? 'bg-amber-500' : 'bg-destructive'
                    }`} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
