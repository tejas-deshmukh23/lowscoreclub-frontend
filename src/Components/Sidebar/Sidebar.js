// export default function Sidebar2() {
//     const tags = ["Next.js", "React", "JavaScript", "CSS"];
    
//     return (
//       <div className="bg-white p-4 shadow rounded">
//         <h2 className="text-lg font-semibold mb-4">Popular Tags</h2>
//         <div className="flex flex-wrap gap-2">
//           {tags.map((tag) => (
//             <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-sm">{tag}</span>
//           ))}
//         </div>
//       </div>
//     );
//   }
import { Search, Filter, Home, Users, Tag, Star, Settings, HelpCircle } from 'lucide-react';
import { Shield } from 'lucide-react';
import { Mail } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-[50px] pt-6">
            <nav className="space-y-1 px-4">
                <a href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                    <Home className="h-5 w-5 mr-3" />
                    <span>Home</span>
                </a>
                {/* <a href="/users" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                    <Users className="h-5 w-5 mr-3" />
                    <span>Users</span>
                </a> */}
                {/* <a href="/tags" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                    <Tag className="h-5 w-5 mr-3" />
                    <span>Tags</span>
                </a> */}

                {/* <div className="pt-4 mt-4 border-t border-gray-200"> */}
                    {/* <h3 className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                        My Lists
                    </h3> */}
                    {/* <a href="/bookmarks" className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-50 rounded-md">
                        <Star className="h-5 w-5 mr-3" />
                        <span>Bookmarks</span>
                    </a> */}
                {/* </div> */}

                <div className="pt-4 mt-4 border-t border-gray-200">
                    <h3 className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Support
                    </h3>
                    
                    <a href="/privacy" className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-50 rounded-md">
                        <Shield className="h-5 w-5 mr-3" />
                        <span>Privacy Policy</span>
                    </a>
                    <a href="/contactus" className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-50 rounded-md">
                        <Mail className="h-5 w-5 mr-3" />
                        <span>Contact Us</span>
                    </a>
                    <a href="/settings" className="flex items-center px-4 py-2 mt-1 text-gray-700 hover:bg-gray-50 rounded-md">
                        <Settings className="h-5 w-5 mr-3" />
                        <span>Settings</span>
                    </a>
                    {/* <a href="/help" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                        <HelpCircle className="h-5 w-5 mr-3" />
                        <span>Help Center</span>
                    </a> */}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;