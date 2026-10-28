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
    },
    {
        title: 'Profesionales',
        href: '/veterinarios',
    },
    {
        title: 'Tienda de Productos',
        href: '/productos',
    },
    {
        title: 'Consultas a Gestionar',
        href: '/veterinario/consultas',
    },
    {
        title: 'Citas Hechas',
        href: '/citas',
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
        //permission: 'listar usuarios',
    }, 
    { 
        title: 'Roles', 
        href: '/roles', 
        icon: Shield, 
        //permission: 'listar roles', 
    }, 
    { 
        title: 'Permisos', 
        href: '/permissions', 
        icon: ShieldHalf, 
        //permission: 'listar permisos',
    },
];

const footerNavItems: NavItem[] = [
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
];

export function AppSidebar() {

    const { can } = useAuth();

    const filteredNavItems = mainNavItems.filter((item) => {
        // Si el ítem no tiene la propiedad 'permission', se muestra a todos (ej: Dashboard). 
        // Si la tiene, evalúa si el usuario tiene el permiso asignado en Spatie. 
        return !item.permission || can(item.permission); 
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
                {/* Le pasamos el array filtrado en lugar del original estático */} 
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
