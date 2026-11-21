import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { imageManifest } from "@/data/image-manifest";
import { videoManifest } from "@/data/video-manifest";
import { ExternalLink, ShieldCheck, Camera, Video, Film } from "lucide-react";

interface ImageCreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageCreditsModal({ open, onOpenChange }: ImageCreditsModalProps) {
  const attributedImages = imageManifest.filter((img) => img.attributionRequired);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-[#FAF8F4] border-[#DFD7C7] text-[#1A3429] p-6 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244B3B] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#D6AD72]" />
            <span>Minh Bạch Bản Quyền & Nguồn Gốc</span>
          </div>
          <DialogTitle className="text-2xl font-serif text-[#1A3429]">
            Ghi Công Bản Quyền Tư Liệu (Credits)
          </DialogTitle>
          <p className="text-xs text-[#5A6D63] font-light mt-1">
            NinhBinhTravel tuân thủ nghiêm ngặt quy định sở hữu trí tuệ. Tất cả hình ảnh và video sử dụng trên nền tảng đều được cấp phép tự do (Creative Commons, Pexels License hoặc Public Domain) từ các tác giả uy tín.
          </p>
        </DialogHeader>

        <Tabs defaultValue="videos" className="mt-4">
          <TabsList className="bg-[#EAE3D5] p-1 border border-[#DFD7C7] rounded-xl grid grid-cols-2 max-w-md">
            <TabsTrigger
              value="videos"
              className="data-[state=active]:bg-[#244B3B] data-[state=active]:text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Hiệu Ứng ({videoManifest.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="data-[state=active]:bg-[#244B3B] data-[state=active]:text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Hình Ảnh ({attributedImages.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: VIDEO CREDITS */}
          <TabsContent value="videos" className="space-y-4 pt-2">
            <div className="p-3.5 rounded-xl bg-[#EAE3D5]/60 border border-[#DFD7C7] text-xs text-[#244B3B] leading-relaxed">
              <p className="font-semibold mb-1">Quy định bản quyền Video Pexels:</p>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-[#335544]">
                <li>
                  &quot;Aerial View of Trang An Landscapes in Vietnam&quot; của Sergey Guk, trên Pexels. Giấy phép Pexels.{" "}
                  <a
                    href="https://www.pexels.com/video/aerial-view-of-trang-an-landscapes-in-vietnam-30468239/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#244B3B] font-medium hover:text-[#D6AD72]"
                  >
                    Xem link gốc
                  </a>
                </li>
                <li>
                  &quot;Scenic Aerial View of Trang An, Vietnam&quot; của Sergey Guk, trên Pexels. Giấy phép Pexels.{" "}
                  <a
                    href="https://www.pexels.com/video/scenic-aerial-view-of-trang-an-vietnam-30468300/ "
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#244B3B] font-medium hover:text-[#D6AD72]"
                  >
                    Xem link gốc
                  </a>
                </li>
                <li>
                  &quot;A Timelapse Video of a Hang Mua Viewpoint Under the Cloudy Sky&quot; của GIANG VU, trên Pexels. Giấy phép Pexels.{" "}
                  <a
                    href="https://www.pexels.com/video/a-timelapse-video-of-a-hang-mua-viewpoint-under-the-cloudy-sky-15091934/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#244B3B] font-medium hover:text-[#D6AD72]"
                  >
                    Xem link gốc
                  </a>
                </li>
              </ul>
              <p className="mt-2 text-[11px] italic text-[#5A6D63]">
                Ghi chú xử lý: &quot;Video đã được cắt ngắn, giảm độ phân giải và bỏ âm thanh để phù hợp với website.&quot;
              </p>
            </div>

            {/* Video Detailed Table */}
            <div className="overflow-x-auto border border-[#DFD7C7] rounded-2xl bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#244B3B] text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Mã</th>
                    <th className="px-4 py-3 font-semibold">Tên tác phẩm & Vị trí</th>
                    <th className="px-4 py-3 font-semibold">Tác giả</th>
                    <th className="px-4 py-3 font-semibold">Giấy phép</th>
                    <th className="px-4 py-3 font-semibold">Thông số</th>
                    <th className="px-4 py-3 font-semibold text-right">Nguồn gốc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFD7C7]/60">
                  {videoManifest.map((v) => (
                    <tr key={v.id} className="hover:bg-[#F5F1E8]/60 transition-colors">
                      <td className="px-4 py-3 font-mono text-[11px] font-bold text-[#244B3B]">
                        {v.id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 font-medium text-[#1A3429]">
                          <Film className="w-3.5 h-3.5 text-[#D6AD72] shrink-0" />
                          <span>{v.title}</span>
                        </div>
                        <span className="text-[11px] text-[#769477] block mt-0.5">
                          {v.place}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#244B3B]">
                        {v.author}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={v.licenseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#244B3B] underline font-medium hover:text-[#D6AD72]"
                        >
                          {v.license}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-[11px] text-[#5A6D63]">
                        <div>{v.resolution}</div>
                        <div>{v.duration}s · {v.fps} fps</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a
                          href={v.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#244B3B] hover:text-[#D6AD72] underline font-medium"
                        >
                          <span>Pexels</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* TAB 2: IMAGE CREDITS */}
          <TabsContent value="images" className="space-y-4 pt-2">
            <div className="p-3 rounded-xl bg-[#EAE3D5]/60 border border-[#DFD7C7] text-xs text-[#244B3B]">
              <strong>Lưu ý về giấy phép CC BY-SA (ShareAlike):</strong> Các hình ảnh gắn giấy phép CC BY-SA tuân thủ nguyên tắc <em>&quot;Chia sẻ tương tự&quot;</em> — cho phép phân phối và tái sử dụng với điều kiện ghi công tác giả gốc và chia sẻ tác phẩm phái sinh theo giấy phép tương thích.
            </div>

            <div className="overflow-x-auto border border-[#DFD7C7] rounded-2xl bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#244B3B] text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">STT</th>
                    <th className="px-4 py-3 font-semibold">Tên ảnh / Địa danh</th>
                    <th className="px-4 py-3 font-semibold">Tác giả</th>
                    <th className="px-4 py-3 font-semibold">Giấy phép</th>
                    <th className="px-4 py-3 font-semibold">Đặc tính</th>
                    <th className="px-4 py-3 font-semibold text-right">Nguồn gốc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFD7C7]/60">
                  {attributedImages.map((img, idx) => (
                    <tr key={img.id} className="hover:bg-[#F5F1E8]/60 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-[11px] text-[#5A6D63]">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-2.5 font-medium text-[#1A3429]">
                        <div className="flex items-center gap-1.5">
                          <Camera className="w-3 h-3 text-[#D6AD72] flex-shrink-0" />
                          <span>{img.place}</span>
                        </div>
                        <span className="text-[10px] text-[#769477] font-mono block mt-0.5">
                          {img.id}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-semibold text-[#244B3B]">
                        {img.author}
                      </td>
                      <td className="px-4 py-2.5">
                        {img.licenseUrl ? (
                          <a
                            href={img.licenseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#244B3B] underline font-medium hover:text-[#D6AD72]"
                          >
                            {img.license}
                          </a>
                        ) : (
                          <span>{img.license}</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        {img.illustrative ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-medium">
                            Minh họa
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-medium">
                            Đúng địa danh
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <a
                          href={img.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#244B3B] hover:text-[#D6AD72] underline font-medium"
                        >
                          <span>Trang gốc</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 pt-3 border-t border-[#DFD7C7] flex justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-xl bg-[#244B3B] text-white text-xs font-semibold hover:bg-[#173428] transition-colors cursor-pointer"
          >
            Đóng bảng ghi công
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ImageCreditsModal;
