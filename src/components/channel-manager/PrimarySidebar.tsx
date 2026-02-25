const logoImage = 'https://www.figma.com/api/mcp/asset/d56c3ee8-b708-4345-9a05-29e5ff6b67d5'
const userAvatar = 'https://www.figma.com/api/mcp/asset/784e9ba5-1254-47b9-adf2-78a62fb75747'

const sidebarIcons = [
  { src: 'https://www.figma.com/api/mcp/asset/5a2b2fc3-01b6-4ea0-bb9a-a90828a1c963' },
  { src: 'https://www.figma.com/api/mcp/asset/f7f913a3-7d62-4b1a-bc8b-36264c52caba' },
  { src: 'https://www.figma.com/api/mcp/asset/cd190197-4c6f-4a20-a547-9e600c20b40f' },
  { src: 'https://www.figma.com/api/mcp/asset/fbe78eea-2759-4739-a50b-2c87a10ec800' },
  { src: 'https://www.figma.com/api/mcp/asset/3f2624d0-00db-4411-99ac-bd55d30d20b3' },
  { src: 'https://www.figma.com/api/mcp/asset/90c05595-6fa5-45b8-ba63-2482a1ec558c' },
  { src: 'https://www.figma.com/api/mcp/asset/2f59b3d1-7854-4672-a5a3-d1b4555374c9' },
  { src: 'https://www.figma.com/api/mcp/asset/a73dad53-41a1-442c-8403-653cce87396e' },
  { src: 'https://www.figma.com/api/mcp/asset/41ad9386-f07e-440e-9ad0-81d9a59c737e' },
  { src: 'https://www.figma.com/api/mcp/asset/889fafc6-209b-4643-849b-9c1c82b18d87' },
  { src: 'https://www.figma.com/api/mcp/asset/8e49214f-5d00-40c4-b409-a282b47bf504' },
  { src: 'https://www.figma.com/api/mcp/asset/dfce2361-d65d-46c9-a9c6-4010df273335' },
  { src: 'https://www.figma.com/api/mcp/asset/f0189f49-9652-4c1f-9368-9af8d23235de' },
  { src: 'https://www.figma.com/api/mcp/asset/d3baa076-771d-4a62-b9b4-d238f5df2ebd' },
  { src: 'https://www.figma.com/api/mcp/asset/4972ed0f-ddb4-4761-a4a6-d5cb710dcb58' },
  { src: 'https://www.figma.com/api/mcp/asset/f853cc1e-fd47-464a-b7a7-1cc7ed368f53' },
  { src: 'https://www.figma.com/api/mcp/asset/4772be34-8b0a-4ac0-9518-5c65c60cf712' },
  { src: 'https://www.figma.com/api/mcp/asset/a34cfea7-3747-4e8c-9e29-94e6f27bed36' },
  { src: 'https://www.figma.com/api/mcp/asset/42a7a808-7cf8-4b6e-b1f9-f814aadcdeb2' },
]

export interface PrimarySidebarProps {
  activeIndex?: number
}

export function PrimarySidebar({ activeIndex = 4 }: PrimarySidebarProps) {
  return (
    <aside className="w-[68px] shrink-0 p-1 h-[calc(100vh-16px)] sticky top-2 self-start bg-transparent">
      <div className="h-full rounded-xl bg-transparent flex flex-col items-center justify-between">
        <div className="w-full pt-5">
          <div className="px-3">
            <div
              className="relative w-8 h-8 rounded-lg overflow-hidden border border-[rgba(10,13,18,0.12)] shadow-[0px_1px_1px_-0.5px_rgba(10,13,18,0.13),0px_1px_3px_rgba(10,13,18,0.1),0px_1px_2px_rgba(10,13,18,0.06)]"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(10, 13, 18, 0.2) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)',
              }}
            >
              <img src={logoImage} alt="" className="w-full h-full object-cover pointer-events-none" />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-0.5px_0.5px_0px_rgba(10,13,18,0.1)]" />
            </div>
          </div>
          <div className="mt-4 px-3 flex flex-col items-center gap-[2px] pointer-events-none select-none">
            {sidebarIcons.map((icon, index) => (
              <div
                key={`${icon.src}-${index}`}
                className="w-10 h-10 rounded-md flex items-center justify-center"
                style={{ background: index === activeIndex ? '#fafafa' : 'transparent' }}
              >
                <span
                  className="flex items-center justify-center shrink-0 pointer-events-none"
                  style={{
                    width: 20,
                    height: 20,
                  }}
                >
                  <img
                    src={icon.src}
                    alt=""
                    className="w-auto h-auto max-w-full max-h-full object-contain block"
                    style={{ maxWidth: 18, maxHeight: 18 }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full px-3 pb-5 flex justify-center">
          <div className="relative w-10 h-10 rounded-full border border-[rgba(0,0,0,0.08)] overflow-visible">
            <img src={userAvatar} alt="" className="w-full h-full object-cover rounded-full pointer-events-none" />
            <span className="absolute -right-px -bottom-px w-2.5 h-2.5 rounded-full border-[1.5px] border-white bg-[#17b26a]" />
          </div>
        </div>
      </div>
    </aside>
  )
}
