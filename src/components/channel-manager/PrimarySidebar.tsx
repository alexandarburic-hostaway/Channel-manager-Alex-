const sidebarLogo = 'https://www.figma.com/api/mcp/asset/3997d600-f64e-4b1b-a822-82ef3fc051bc'
const userAvatar = 'https://www.figma.com/api/mcp/asset/dfdea75e-29f6-4094-a98f-6448d3271185'
const sidebarIcons = [
  'https://www.figma.com/api/mcp/asset/954af460-cdb7-4c5e-a72e-3e325a730f9e',
  'https://www.figma.com/api/mcp/asset/89eafbfb-6022-460b-8e25-4040f46c6685',
  'https://www.figma.com/api/mcp/asset/8f96e007-d4c5-4184-aaa8-6faf2641133e',
  'https://www.figma.com/api/mcp/asset/04463e30-835d-4e22-829e-b4db792c868f',
  'https://www.figma.com/api/mcp/asset/e6104815-aff2-484e-a18b-dc8aa2444966',
  'https://www.figma.com/api/mcp/asset/a31a5f58-243b-4a2d-bd11-4f77a8956e8c',
  'https://www.figma.com/api/mcp/asset/e1110ff5-ea77-4207-9277-52761572ba4d',
  'https://www.figma.com/api/mcp/asset/3fe8728c-5b93-4772-93e6-80bb5493a732',
  'https://www.figma.com/api/mcp/asset/e06aad84-b688-41c3-9b5c-54237d42716b',
  'https://www.figma.com/api/mcp/asset/67959b0c-19ea-4e0c-a354-4630b35bdd1b',
  'https://www.figma.com/api/mcp/asset/6afeab96-11f9-49dc-8380-e081bbce6985',
  'https://www.figma.com/api/mcp/asset/0f9e52bb-88cb-43e5-8281-bbe05d6d55a8',
  'https://www.figma.com/api/mcp/asset/174e42ff-dee7-4685-b766-e310d08146a4',
  'https://www.figma.com/api/mcp/asset/e58d0e5d-036c-464a-af33-73272153ed4d',
  'https://www.figma.com/api/mcp/asset/df052066-3901-4bf1-8c67-7f488a5861c7',
  'https://www.figma.com/api/mcp/asset/43d47661-2f39-410f-acc7-238d18e91bda',
  'https://www.figma.com/api/mcp/asset/6672f152-6eff-4b21-830c-87de2a218458',
  'https://www.figma.com/api/mcp/asset/a51c2679-3a8b-4cc2-a47f-251f6e84e4f9',
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
            {sidebarIcons.map((icon, index) => (
              <button
                key={icon}
                className="w-10 h-10 rounded-md flex items-center justify-center"
                style={{ background: index === activeIndex ? '#fafafa' : 'transparent' }}
                aria-label="Primary navigation item"
                type="button"
              >
                <img src={icon} alt="" className="w-5 h-5" />
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
