import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"

const categorySchema = z.object({
  name: z.string().trim().min(1, "Tên danh mục là bắt buộc"),
  detail: z.string().trim().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

type CategoryFormProps = {
  initialData?: CategoryFormData;
  onSubmit: (data: CategoryFormData) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CategoryForm = ({
  initialData, 
  onSubmit,
  setIsOpen,
}: CategoryFormProps 
) => {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData ?? {
      name: "",
      detail: "",
    },
  });

    const handleSubmit = (data: CategoryFormData) => {
      onSubmit(data);
      form.reset();
    };
  return (
     <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên danh mục</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên danh mục" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập mô tả" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end space-x-2">
              <Button className="bg-[#fe4444] hover:bg-[#ef4444]" type="submit">
                {initialData ? "Lưu thay đổi" : "Thêm danh mục"}
              </Button>
               <Button variant={"outline"} onClick={() => {setIsOpen(false)}} >
                Hủy
              </Button>
            </div>
          </form>
        </Form>
  )
}
