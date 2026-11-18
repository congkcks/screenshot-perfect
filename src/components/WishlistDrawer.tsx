import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink, MapPin, Compass } from "lucide-react";
import { destinations } from "@/data/ninh-binh";
import { toast } from "sonner";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onSelectDestination: (id: string) => void;
}

export function WishlistDrawer({
  isOpen,
  onClose,
  savedIds,
  onRemove,
  onClear,
  onSelectDestination,
}: WishlistDrawerProps) {
  const savedDestinations = destinations.filter((dest) =>
    savedIds.includes(dest.id)
  );

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md bg-[#FAF8F4] border-l-[#DFD7C7] text-[#1A3429] flex flex-col p-6">
        <SheetHeader className="pb-4 border-b border-[#DFD7C7]">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-serif text-[#244B3B] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#D6AD72]" />
              Điểm Đến Đã Lưu
            </SheetTitle>
            {savedDestinations.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onClear();
                  toast.info("Đã xóa toàn bộ điểm đến đã lưu.");
                }}
                className="text-xs text-[#A33A38] hover:text-[#A33A38] hover:bg-red-50 p-1.5 h-auto"
              >
                Xóa tất cả
              </Button>
            )}
          </div>
          <SheetDescription className="text-xs text-[#769477]">
            {savedDestinations.length > 0
              ? `Bạn đang lưu ${savedDestinations.length} địa điểm trong hành trình cá nhân.`
              : "Chưa có địa điểm nào được lưu. Bấm biểu tượng trái tim trên các thẻ để lưu lại."}
          </SheetDescription>
        </SheetHeader>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedDestinations.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 rounded-full bg-[#EAE3D5] text-[#244B3B] mx-auto flex items-center justify-center mb-3">
                <Compass className="w-7 h-7 text-[#769477]" />
              </div>
              <p className="text-sm font-medium text-[#1A3429]">
                Hành trình của bạn đang trống
              </p>
              <p className="text-xs text-[#769477] mt-1 max-w-xs mx-auto">
                Khám phá các danh thắng tuyệt đẹp của Ninh Bình và lưu lại những nơi bạn muốn ghé thăm.
              </p>
              <Button
                size="sm"
                onClick={onClose}
                className="mt-4 bg-[#244B3B] hover:bg-[#173428] text-white text-xs"
              >
                Khám Phá Điểm Đến
              </Button>
            </div>
          ) : (
            savedDestinations.map((dest) => (
              <div
                key={dest.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#DFD7C7] hover:border-[#D6AD72] transition-all shadow-sm group"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectDestination(dest.id);
                    onClose();
                  }}
                  onError={(e) => {
                    e.currentTarget.src = dest.fallbackImage;
                  }}
                />
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onSelectDestination(dest.id);
                    onClose();
                  }}
                >
                  <span className="text-[10px] font-semibold text-[#769477] uppercase tracking-wider">
                    {dest.category}
                  </span>
                  <h4 className="text-sm font-semibold text-[#1A3429] truncate group-hover:text-[#244B3B] transition-colors">
                    {dest.name}
                  </h4>
                  <p className="text-[11px] text-[#769477] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#D6AD72]" />
                    {dest.area}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      dest.mapQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#769477] hover:text-[#244B3B] hover:bg-[#F5F1E8] rounded-lg transition-colors"
                    aria-label="Xem chỉ đường"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => {
                      onRemove(dest.id);
                      toast.info(`Đã gỡ ${dest.name}`);
                    }}
                    className="p-1.5 text-gray-400 hover:text-[#A33A38] hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Xóa điểm đến"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {savedDestinations.length > 0 && (
          <div className="pt-4 border-t border-[#DFD7C7] flex gap-2">
            <Button
              className="w-full bg-[#244B3B] hover:bg-[#173428] text-white text-xs py-2 shadow-md"
              onClick={() => {
                onClose();
                document.getElementById("ban-do")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Xem Vị Trí Trên Bản Đồ
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
