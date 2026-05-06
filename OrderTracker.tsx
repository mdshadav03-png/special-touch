import React from 'react';
import { motion } from 'motion/react';
import { Package, Truck, Clock, CheckCircle, MapPin } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { cn } from '../lib/utils';

interface OrderTrackerProps {
  order: Order;
}

const statusSteps: { status: OrderStatus; icon: React.ElementType; label: string }[] = [
  { status: 'Processing', icon: Clock, label: 'Processing' },
  { status: 'Shipped', icon: Package, label: 'Shipped' },
  { status: 'Out for Delivery', icon: Truck, label: 'Out for Delivery' },
  { status: 'Delivered', icon: CheckCircle, label: 'Delivered' }
];

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order }) => {
  const currentStatusIndex = statusSteps.findIndex(s => s.status === order.status);
  
  return (
    <div className="py-6 px-4">
      <div className="relative mb-10">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-brand-pink -translate-y-1/2 transition-all duration-1000 ease-in-out" 
          style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
        />
        
        <div className="relative flex justify-between">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            
            return (
              <div key={step.status} className="flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors border-2",
                  isCompleted ? "bg-brand-pink border-brand-pink text-white" : 
                  isCurrent ? "bg-white border-brand-pink text-brand-pink" : 
                  "bg-white border-gray-200 text-gray-300"
                )}>
                  {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                </div>
                <span className={cn(
                  "text-[10px] sm:text-xs font-bold mt-2 uppercase tracking-tighter whitespace-nowrap",
                  isCurrent ? "text-brand-pink" : "text-gray-500"
                )}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Tracking History</h4>
        <div className="space-y-6">
          {order.trackingHistory.map((history, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={history.timestamp} 
              className="flex gap-3 relative"
            >
              {index !== order.trackingHistory.length - 1 && (
                <div className="absolute left-2 top-6 w-0.5 h-full bg-gray-100" />
              )}
              <div className={cn(
                "w-4 h-4 rounded-full mt-1 shrink-0 flex items-center justify-center",
                index === 0 ? "bg-brand-pink scale-125" : "bg-gray-200"
              )}>
                {index === 0 && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className={cn(
                    "text-xs sm:text-sm font-bold",
                    index === 0 ? "text-gray-900" : "text-gray-500"
                  )}>
                    {history.description}
                  </p>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                    {new Date(history.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center text-[10px] text-gray-400 mt-1">
                  <MapPin size={10} className="mr-1" />
                  {history.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {order.estimatedDelivery && order.status !== 'Delivered' && (
        <div className="mt-8 bg-pink-50 p-3 rounded-lg border border-pink-100 flex items-center">
          <Truck size={18} className="text-brand-pink mr-3" />
          <div className="text-[11px] sm:text-xs">
            <span className="text-pink-900 font-bold">Estimated Delivery: </span>
            <span className="text-pink-800">
              {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
