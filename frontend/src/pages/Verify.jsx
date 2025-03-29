import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    console.log(success, orderId)

    const verifyPayment = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/order/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ success, orderId })
            })

            const data = await res.json();

            if (data.success) {
                navigate("/myorders")
            } else {
                navigate("/")
            }
        } catch (error) {
            navigate("/")
            console.log(error)
        }
    }
    useEffect(() => {
        verifyPayment()
    }, [])
    return (
        <div className="text-center p-5">
            <h2>Please wait...</h2>
        </div>
    )
}

export default Verify