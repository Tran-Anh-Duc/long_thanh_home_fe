<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getProject, updateProject, createProject } from '@/api/project.api'
import { getProjectCategories } from '@/api/category.api'
import { useToast } from '@/composables/useToast'

/* ================= ROUTER ================= */
const router = useRouter()
const route = useRoute()
const toast = useToast()

const projectId = route.params.id as string | undefined
const isEdit = computed(() => !!projectId)

/* ================= STATE ================= */
const loading = ref(false)
const errors = ref<Record<string, string[]>>({})

const form = ref({
  project_category_id: '',
  title: '',
  slug: '',
  location: '',
  price_from: '',
  description: '',
  is_active: true,
})

const categories = ref<any[]>([])
const thumbnail = ref<File | null>(null)
const existingThumbnail = ref<string | null>(null)

/* ================= LOAD DATA ================= */
onMounted(async () => {
  try {
    const cateRes = await getProjectCategories()
    categories.value = cateRes.data?.data ?? cateRes.data

    if (isEdit.value && projectId) {
      // ✅ FIX CHÍNH Ở ĐÂY
      const p = await getProject(projectId)

      form.value = {
        project_category_id: String(
            typeof p.project_category === 'object'
                ? p.project_category.id
                : p.project_category,
        ),
        title: p.title,
        slug: p.slug,
        location: p.location ?? '',
        price_from: p.price_from ? String(p.price_from) : '',
        description: p.description ?? '',
        is_active: p.is_active,
      }

      existingThumbnail.value = p.thumbnail ?? null

    }
  } catch {
    toast.open('Không tải được dữ liệu dự án', 'error')
  }
})

/* ================= HANDLERS ================= */
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    thumbnail.value = input.files[0]
  }
}

async function submit() {
  loading.value = true
  errors.value = {}

  toast.open(
      isEdit.value ? 'Đang cập nhật dự án...' : 'Đang tạo dự án...',
      'loading',
  )

  try {
    const data = new FormData()

    Object.entries(form.value).forEach(([key, value]) => {
      if (key === 'is_active') {
        data.append('is_active', value ? '1' : '0')
      } else {
        data.append(key, String(value ?? ''))
      }
    })

    if (thumbnail.value) {
      data.append('thumbnail', thumbnail.value)
    }

    if (isEdit.value && projectId) {
      await updateProject(projectId, data)
      toast.open('Cập nhật dự án thành công', 'success')
    } else {
      await createProject(data)
      toast.open('Tạo dự án mới thành công', 'success')
    }

    router.push('/admin/projects')
  } catch (e: any) {
    errors.value = e.response?.data?.errors || {}
    toast.open(
        e.response?.data?.message || 'Có lỗi xảy ra, vui lòng kiểm tra lại',
        'error',
    )
  } finally {
    loading.value = false
  }
}
</script>
