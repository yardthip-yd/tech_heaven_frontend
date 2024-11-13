import React, { useRef } from 'react';
import { Truck, Clock, Wrench, Shield } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const ServiceFeatures = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Delivery",
      description: "For orders over THB 1,000",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Store Pickup",
      description: "Ready within 1 hour after order confirmation",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Repair & PC Build",
      description: "Book repair services & PC spec consultation",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Warranty",
      description: "12 months coverage on all products",
      gradient: "from-blue-500 to-indigo-600"
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="w-full bg-white py-16" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex-1 group relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative p-6 h-full border border-slate-100 rounded-xl bg-gradient-to-br from-slate-50 to-white hover:shadow-lg transition-all duration-300 py-10">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className='flex flex-row gap-6'>
                  <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.gradient} p-4 text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <div className="relative z-10 flex flex-col">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;
