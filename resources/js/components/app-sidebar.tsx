import { Link } from '@inertiajs/react';
import { 
    PawPrint,    
    Stethoscope,
    Package,
    CalendarPlus,
    CalendarDays,
    ClipboardList,
    CalendarCog,
    BookOpen, FolderGit2,
    LayoutGrid,
    Shield,
    ShieldHalf,
    Users 
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import { useAuth } from '@/hooks/use-auth';

const generalNavItems: NavItem[] = [
    {
        title: 'Tus Mascotas',
        href: '/mascotas',
        necesitaAuth: true,
        icon: PawPrint,
    },
    {
        title: 'Profesionales',
        href: '/veterinarios',
        icon: Stethoscope,
    },
    {
        title: 'Inventario de Productos',
        href: '/productos',
        icon: Package,
    },
    {
        title: 'Agendar Cita',
        href: '/agendarcita',
        icon: CalendarPlus,
    },
    {
        title: 'Citas Agendadas',
        href: '/citas',
        permission: 'ver citas',
        necesitaAuth: true,
        icon: CalendarDays,
    },
];

const exclusivoNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        necesitaAuth: true,
        icon: LayoutGrid,
    },
    {
        title: 'Consultas a Gestionar',
        href: '/veterinario/consultas',
        permission: 'gestionar consultas',
        icon: ClipboardList,
    },
    {
        title: 'Citas a Gestionar',
        href: '/citas/admin',
        permission: 'gestionar citas',
        icon: CalendarCog,
    },
    {
        title: 'Usuarios', 
        href: '/users', 
        icon: Users, 
        permission: 'listar usuarios',
    }, 
    { 
        title: 'Roles', 
        href: '/roles', 
        icon: Shield, 
        permission: 'listar roles', 
    }, 
    { 
        title: 'Permisos', 
        href: '/permissions', 
        icon: ShieldHalf, 
        permission: 'listar permisos',
    },
];

/*
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Tus Mascotas',
        href: '/mascotas',
        necesitaAuth: true,
    },
    {
        title: 'Profesionales',
        href: '/veterinarios',
    },
    {
        title: 'Inventario de Productos',
        href: '/productos',
    },
    {
        title: 'Consultas a Gestionar',
        href: '/veterinario/consultas',
        permission: 'gestionar consultas',
    },
    {
        title: 'Agendar Cita',
        href: '/agendarcita',
    },
    {
        title: 'Citas Agendadas',
        href: '/citas',
        permission: 'ver citas',
        necesitaAuth: true,
    },
    {
        title: 'Citas a Gestionar',
        href: '/citas/admin',
        permission: 'gestionar citas',
    },
    {
        title: 'Usuarios', 
        href: '/users', 
        icon: Users, 
        permission: 'listar usuarios',
    }, 
    { 
        title: 'Roles', 
        href: '/roles', 
        icon: Shield, 
        permission: 'listar roles', 
    }, 
    { 
        title: 'Permisos', 
        href: '/permissions', 
        icon: ShieldHalf, 
        permission: 'listar permisos',
    },
];
*/


const footerNavItems: NavItem[] = [
    /*
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
    */
];


export function AppSidebar() {

    const { can, user } = useAuth();

    const filterItems = (items: NavItem[]) => {
        return items.filter((item) => {
            if (item.esVisitante && user) return false;
            if (item.necesitaAuth && !user) return false;
            if (item.permission) {
                if (!user || !can(item.permission)) return false;
            } 
            return true;
        });
    };

    const filteredGeneralItems = filterItems(generalNavItems);
    const filteredManagementItems = filterItems(exclusivoNavItems);

    /*
    const filteredNavItems = mainNavItems.filter((item) => {
        if (item.esVisitante && user) return false;

        if (item.necesitaAuth && !user) return false;

        if (item.permission) {
            if (!user || !can(item.permission)) return false;
        } 
        return true;
    });
    */

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch className="flex items-center gap-2.5 overflow-hidden">
                                <img 
                                    src="/storage/imagenes/logo.png" 
                                    alt="Veterinaria Chiquititos" 
                                    className="h-14 w-18 sm:h-14 sm:w-18 object-contain shrink-0" 
                                />
                                <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                                    <span className="text-sm font-extrabold tracking-tight text-orange-600 dark:text-orange-400 leading-tight">
                                        Chiquititos
                                    </span>
                                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                                        Veterinaria
                                    </span>
                                </div>
                                {/* <AppLogo /> */}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroupLabel>Servicios</SidebarGroupLabel>
                <NavMain items={filteredGeneralItems} />
                {filteredManagementItems.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Gestión y Administración</SidebarGroupLabel>
                        <NavMain items={filteredManagementItems} />
                    </SidebarGroup>
                )}
            </SidebarContent>

            {/*
            <SidebarContent> 
                <NavMain items={filteredNavItems} /> 
            </SidebarContent>
            */}

            {/*
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
            */}

            
            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
