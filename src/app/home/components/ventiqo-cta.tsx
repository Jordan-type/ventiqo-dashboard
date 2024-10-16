import { Button } from "@/components/ui/button";

const VentiqoCTA = () => {
  return (
    <div className="flex flex-col items-center space-y-8 mt-20">
    <div className="flex space-x-8">
        <div className="relative bg-teal-600 text-white p-8 rounded-lg shadow-lg">
            <div className="absolute inset-0 border-2 border-teal-600 rounded-lg transform translate-x-2 translate-y-2"></div>
            <h2 className="font-indie text-2xl mb-4">Ready to Elevate Your Events?</h2>
            <button className="bg-orange-400 text-white py-2 px-4 rounded-full">Get started Today!</button>
        </div>
        <div className="relative bg-blue-400 text-white p-8 rounded-lg shadow-lg">
            <div className="absolute inset-0 border-2 border-blue-400 rounded-lg transform -translate-x-2 -translate-y-2"></div>
            <h2 className="font-indie text-2xl mb-4">Discover Your Next Adventure</h2>
            <button className="bg-orange-400 text-white py-2 px-4 rounded-full">Explore events Now!</button>
        </div>
    </div>
    <button className="bg-orange-400 text-white py-3 px-6 rounded-full">Start Planning your Event Today</button>
</div>
  );
};

export default VentiqoCTA;
