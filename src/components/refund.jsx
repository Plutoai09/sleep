import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Refund = () => {
  return (
    <Card className="w-full h-screen max-h-[800px] overflow-hidden">
      <CardContent className="p-0 h-full">
        <div className="relative w-full h-full">
          <iframe 
            src="https://getpluto.in/refund"
            className="absolute inset-0 w-full h-full border-0"
            title="Pluto Website"
            allowFullScreen
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Refund;