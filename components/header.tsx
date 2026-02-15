import { useAuth } from "@/services/AuthContext";
import { Link, UserCircleIcon } from "lucide-react"
import { Head } from "next/document"

export async function handleGoogleSignIn(signInWithGoogle: () => Promise<void>) {
    try {
        await signInWithGoogle();
    } catch (error) {
        console.error("Failed to sign in:", error);
    }
}

export default function NavHeader() {
    const { user, logOut, signInWithGoogle, loading } = useAuth();

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };
    // Get user's first name from email (fallback to "there")
    const getUserName = () => {
        if (!user?.email) return "there";
        return user.email.split("@")[0].split(".")[0] || "there";
    };
    return (
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
                {/* <div className="w-8 h-8 bg-gradient-to-r from-[#8aa66e] to-[#a8c686] rounded-lg"></div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent">
            <Link href="/">LifeMap</Link>
          </span> */}
                <Link href="/" className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="36"
                        height="36"
                        fill="#6b8e23"
                    >
                        <path d="M11.774 2a10 10 0 1 1-10 10a10 10 0 0 1 10-10m5.5 5.98l-1.112 1.732a4.9 4.9 0 0 1 .535 2.246a4.96 4.96 0 0 1-4.956 4.964h-.009a4.8 4.8 0 0 1-2.232-.535L7.754 17.51a6.826 6.826 0 0 0 9.652-9.34Zm-5.542-2.855a6.833 6.833 0 0 0-6.832 6.82v.013a6.77 6.77 0 0 0 1.332 4.052A8 8 0 0 1 7.4 14.4a10 10 0 0 1 1.187-1.06a8.17 8.17 0 0 1 4.833-1.575a8 8 0 0 1 1.458.132l.284.058a3.428 3.428 0 1 0-6.855-.151v.151a2 2 0 0 0 .015.312l.018.155a8.2 8.2 0 0 0-1.292 1.2a5 5 0 0 1-.283-1.649A4.96 4.96 0 0 1 11.714 7h.008a4.8 4.8 0 0 1 2.235.537l1.732-1.124a6.67 6.67 0 0 0-3.957-1.288m1.722 7.263a7.8 7.8 0 0 0-4.567 1.47a3.43 3.43 0 0 0 6.213-1.291a7.7 7.7 0 0 0-1.646-.179" />
                    </svg>
                    <span className="text-xl font-bold bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent">
                        LifeMap
                    </span>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                {!loading && (
                    <>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#d4e4c8]">
                                    <UserCircleIcon className="w-5 h-5 text-[#6b8e23]" />
                                    <span className="text-gray-700 text-sm font-medium">
                                        {getUserName()}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 transition text-sm hover:bg-white/50 rounded-lg"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleGoogleSignIn(signInWithGoogle)}
                                className="bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white px-5 py-2 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg"
                            >
                                Sign in with Google
                            </button>
                        )}
                    </>
                )}
            </div>
        </nav>
    )
}