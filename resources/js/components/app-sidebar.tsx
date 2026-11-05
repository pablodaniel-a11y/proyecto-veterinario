import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Shield, ShieldHalf, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import { useAuth } from '@/hooks/use-auth';

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
        title: 'Crear una Cita',
        href: '/citas/create',
        esVisitante: true,
    },
    {
        title: 'Consultas a Gestionar',
        href: '/veterinario/consultas',
        permission: 'gestionar consultas',
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

    const filteredNavItems = mainNavItems.filter((item) => {
        if (item.esVisitante && user) return false;

        if (item.necesitaAuth && !user) return false;

        if (!item.permission || can(item.permission)) return true; 
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent> 
                <NavMain items={filteredNavItems} /> 
            </SidebarContent>

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
