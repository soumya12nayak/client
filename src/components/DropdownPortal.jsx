import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function DropdownPortal({ anchorRef, visible, children }) {
    const [styles, setStyles] = useState({});
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (anchorRef.current && visible) {
            const rect = anchorRef.current.getBoundingClientRect();
            setStyles({
                position: "absolute",
                top: rect.bottom + window.scrollY + 8, // 8px gap
                left: rect.left + window.scrollX,
                zIndex: 9999,
            });
        }
    }, [anchorRef, visible]);

    if (!visible) return null;

    return createPortal(
        <div
            ref={dropdownRef}
            style={styles}
            className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl rounded-lg p-4 w-64 ring-1 ring-blue-500/40"
        >
            {children}
        </div>

        ,
        document.body
    );
}
