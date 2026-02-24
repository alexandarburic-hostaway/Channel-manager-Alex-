const sidebarLogo = `${import.meta.env.BASE_URL}channels/airbnb.svg`
const userAvatar = 'https://i.pravatar.cc/80?img=32'
const sidebarIcons = [
  'M3 4h8v8H3zM13 4h8v8h-8zM3 14h8v8H3zM13 14h8v8h-8z',
  'M3 12h18M12 3v18',
  'M4 6h16M4 12h16M4 18h16',
  'M12 3l8 6v10H4V9l8-6Z',
  'M4 7h16v10H4zM8 3v4M16 3v4',
  'M4 6h16v12H4zM8 10h8M8 14h5',
  'M5 7h14v10H5zM9 11h6M9 15h6',
  'M5 5h14v14H5zM9 9h6v6H9z',
  'M4 8h16M4 12h16M4 16h10',
  'M12 4v16M4 12h16',
  'M6 4h12v16H6zM9 8h6M9 12h6',
  'M4 5h16v14H4zM7 9h10M7 13h7',
  'M5 5h14v14H5zM8 8h8M8 12h8M8 16h6',
  'M4 7h16M7 4v16M17 4v16',
  'M4 6h16v12H4zM6 10h12M6 14h8',
  'M5 6h14v12H5zM8 9h8M8 13h5',
  'M4 4h16v16H4zM8 8h8M8 12h8',
  'M6 4h12v16H6M9 8h6M9 12h6',
]

export interface PrimarySidebarProps {
  activeIndex?: number
}

export function PrimarySidebar({ activeIndex = 4 }: PrimarySidebarProps) {
  return (
    <aside className="w-[68px] shrink-0 p-1 h-[calc(100vh-16px)] bg-transparent">
      <div className="h-full rounded-xl bg-white border border-[#e9eaeb] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] flex flex-col items-center justify-between">
        <div className="w-full pt-5">
          <div className="px-3">
            <div className="w-8 h-8 overflow-hidden rounded-lg border border-[rgba(10,13,18,0.12)] shadow-[0px_1px_1px_-0.5px_rgba(10,13,18,0.13),0px_1px_3px_rgba(10,13,18,0.1),0px_1px_2px_rgba(10,13,18,0.06)]">
              <img src={sidebarLogo} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="mt-4 px-3 flex flex-col items-center gap-[2px]">
            {sidebarIcons.map((iconPath, index) => (
              <button
                key={`${iconPath}-${index}`}
                className="w-10 h-10 rounded-md flex items-center justify-center"
                style={{ background: index === activeIndex ? '#fafafa' : 'transparent' }}
                aria-label="Primary navigation item"
                type="button"
              >
                <svg className="w-5 h-5 text-[#717680]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d={iconPath} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="pb-5">
          <div className="relative w-10 h-10 rounded-full border border-[rgba(0,0,0,0.08)] overflow-hidden">
            <img src={userAvatar} alt="" className="w-full h-full object-cover" />
            <span className="absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full bg-[#17b26a] border-[1.5px] border-white" />
          </div>
        </div>
      </div>
    </aside>
  )
}
