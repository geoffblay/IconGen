export default function FeaturesSection() {
    return (
        <div className=" grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
                <p className="text-gray-600">Generate unique icons from simple text descriptions using advanced AI.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Vector Quality</h3>
                <p className="text-gray-600">Get high-quality, scalable icons perfect for any size or resolution.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
                <p className="text-gray-600">Download your icons immediately in multiple formats.</p>
            </div>
        </div>
    );
}